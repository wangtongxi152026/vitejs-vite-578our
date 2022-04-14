import { reactive, ref, defineComponent, onMounted } from "vue";
import styles from "./a.module.css";
import { getDetail, getMaster, 获取资金面 } from "../api";
import { Item, GUpiaoItem } from "../types";
import { bubbleSort, getData, quchong } from "../utils";
export default defineComponent({
  setup(props) {
    // 只有点击时执行
    // const count = ref(999);

    const columns = [
      {
        title: "#",
        width: "60",
        dataIndex: "key",
      },
      {
        title: "名称",
        width: "200",
        dataIndex: "name",
      },
      {
        title: "年化收益",
        width: "115",
        slotName: "annualizedYield",
        filterable: {
          filters: [
            {
              text: "> 40%",
              value: 40,
            },
            {
              text: "> 50%",
              value: 50,
            },
          ],
          filter: (value: number, record: Item) => {
            console.log(record.annualizedYield, value);
            return record.annualizedYield > value;
          },
          // multiple: true,
        },

        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },
      {
        title: "累计收益",
        width: "110",
        slotName: "profitAndList",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },
      {
        title: "最大回撤",
        width: "110",
        slotName: "drawnDown",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },

      {
        title: "特点",
        width: "180",
        slotName: "tags",
      },
      {
        title: "参数",
        slotName: "query",
      },
      {
        title: "描述",
        dataIndex: "desc",
      },
    ];

    const radio = ref("资金面");
    const selectValue = ref(["资金面"]);

    const tableData = reactive<{
      list: Item[];
      loading: boolean;
      gupiaoLoading: boolean;
      selectRowData: number[];
      visible: boolean;
      guPiaoList: GUpiaoItem[];
    }>({
      list: [],
      loading: false,
      gupiaoLoading: false,
      visible: false,
      selectRowData: [],
      guPiaoList: [],
    });
    onMounted(async () => {
      let result = await 获取资金面(radio.value);
      tableData.list = getData(result);
    });
    const renderTags = ({ record }: { record: Item }) => {
      return (
        <>
          <a-tag size="small" color="purple">
            {record.labels1}
          </a-tag>
          <a-tag size="small" style={{ "margin-left": "8px" }} color="red">
            {record.labels2}
          </a-tag>
        </>
      );
    };

    const sorterchange = (dataIndex: string, direction: string) => {
      tableData.loading = true;
      console.log(dataIndex, direction, tableData.list);
      if (dataIndex === "__arco_data_index_2") {
        tableData.list = bubbleSort(tableData.list, "annualizedYield", direction);
      } else if (dataIndex === "__arco_data_index_3") {
        tableData.list = bubbleSort(tableData.list, "profitAndList", direction);
      } else if (dataIndex === "__arco_data_index_4") {
        tableData.list = bubbleSort(tableData.list, "drawnDown", direction);
      }
      tableData.loading = false;
    };

    const renderAnnualizedYield = ({ record }: { record: Item }, key: keyof Item) => {
      return (
        <>
          {key !== "drawnDown" ? (
            <a-tag size="large" color="purple">
              <span class={styles.title}>{record[key] + "%"}</span>
            </a-tag>
          ) : (
            record[key] + "%"
          )}
        </>
      );
    };
    const renderGUpicoTags = ({ record }: { record: GUpiaoItem }) => {
      return record.type.map((tag) => {
        return (
          <a-tag key={record.code} color="purple">
            {tag}
          </a-tag>
        );
      });
    };

    const selectionChange = (rowKeys: number[]) => {
      console.log({ rowKeys });
      tableData.selectRowData = rowKeys;
    };
    const onChange = async (v: string) => {
      radio.value = v;
      let result = v === "大师" ? await getMaster() : await 获取资金面(v);
      tableData.list = getData(result);
    };
    const selectValueChange = async (array: string[]) => {
      console.log(array);
      tableData.loading = true;
      selectValue.value = array;
      tableData.list = [];
      for (let index = 0; index < array.length; index++) {
        const v = array[index];
        let result = await 获取资金面(v);
        tableData.list = [...getData(result), ...tableData.list];
      }
      tableData.loading = false;
    };

    const handleClick = async () => {
      try {
        tableData.gupiaoLoading = true;
        tableData.visible = true;
        let dataList: GUpiaoItem[] = [];
        for (let index = 0; index < tableData.selectRowData.length; index++) {
          const i = tableData.selectRowData[index];
          let result1 = await getDetail(tableData.list[i].query);
          let result2 = result1.data.answer[0].txt[0].content.components[0].data;
          let result3 = result2.datas.map((item: any) => {
            let keys = Object.keys(item);
            let 收盘价 = "";
            if (item.最新价) {
              收盘价 = item.最新价;
            } else {
              for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                if (key.includes("收盘价") && key.length < 20) {
                  收盘价 = item[key];
                }
              }
            }
            return {
              股票简称: item.股票简称,
              code: item.code,
              type: tableData.list[i].name,
              收盘价: parseFloat(收盘价),
              涨跌幅: item.最新涨跌幅 + "%",
              上市板块: item.上市板块,
            };
          });
          dataList = [...dataList, ...result3];
        }
        tableData.guPiaoList = quchong(dataList);
        console.log(tableData.guPiaoList);
      } catch (error) {
        console.log(error);
      }
      tableData.gupiaoLoading = false;
    };
    const handleCancel = () => {
      tableData.visible = false;
    };
    const handleOk = () => {
      tableData.visible = false;
    };
    const columns1 = [
      {
        title: "重复次数",
        width: "120",
        dataIndex: "num",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },
      {
        title: "股票代码",
        width: "200",
        dataIndex: "code",
      },
      {
        title: "股票简称",
        width: "200",
        dataIndex: "股票简称",
      },
      {
        title: "收盘价",
        width: "200",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
        dataIndex: "收盘价",
      },
      {
        title: "涨跌幅",
        width: "200",
        dataIndex: "涨跌幅",
      },
      {
        title: "上市板块",
        width: "200",
        dataIndex: "上市板块",
      },
      {
        title: "type",
        width: "200",
        slotName: "type",
      },
    ];
    const renderquery = ({ record }: { record: Item }) => {
      return (
        <a-popover
          v-slots={{
            default: () => <a-button>Hover Me</a-button>,
            content: () => <div class={styles.query}>{record?.query}</div>,
          }}
        ></a-popover>
      );
    };
    return () => {
      return (
        <>
          <div style={styles.box}>
            <div style={styles.header}>
              <a-drawer width="fit-content" vModel:visible={tableData.visible} onOk={handleOk} onCancel={handleCancel}>
                <a-table
                  stripe
                  loading={tableData.gupiaoLoading}
                  columns={columns1}
                  v-slots={{ type: renderGUpicoTags }}
                  data={tableData.guPiaoList}
                  onSorterChange={sorterchange}
                  pagination={false}
                />
              </a-drawer>

              <a-radio-group type="button" onChange={onChange} defaultValue="资金面" value={radio}>
                <a-radio value="资金面">资金面</a-radio>
                <a-radio value="技术面">技术面</a-radio>
                <a-radio value="消息面">消息面</a-radio>
                <a-radio value="基本面">基本面</a-radio>
                <a-radio value="大师">大师</a-radio>
              </a-radio-group>
              <div>
                <div>
                  <a-button onClick={handleClick}>查看选中股票</a-button>
                </div>

                <a-select
                  onChange={selectValueChange}
                  value={selectValue}
                  default-value={["资金面"]}
                  style={{ width: "600px" }}
                  placeholder="Please select ..."
                  multiple
                >
                  <a-option>资金面</a-option>
                  <a-option>技术面</a-option>
                  <a-option>消息面</a-option>
                  <a-option>基本面</a-option>
                  <a-option>大师</a-option>
                </a-select>
              </div>
            </div>

            <div class={styles.tableBox}>
              <a-table
                stripe
                loading={tableData.loading}
                columns={columns}
                data={tableData.list}
                row-selection={{
                  type: "checkbox",
                  showCheckedAll: true,
                }}
                v-slots={{
                  tags: renderTags,
                  annualizedYield: ({ record }: { record: Item }) =>
                    renderAnnualizedYield({ record }, "annualizedYield"),
                  profitAndList: ({ record }: { record: Item }) => renderAnnualizedYield({ record }, "profitAndList"),
                  drawnDown: ({ record }: { record: Item }) => renderAnnualizedYield({ record }, "drawnDown"),
                  query: ({ record }: { record: Item }) => renderquery({ record }),
                }}
                onSorterChange={sorterchange}
                onSelectionChange={selectionChange}
                pagination={false}
              />
            </div>
          </div>
        </>
      );
    };
  },
});
