/** @format */

import { reactive, ref, defineComponent, onMounted, watch, computed } from "vue";
import styles from "./a.module.css";
import { getDetail, getMaster, 获取资金面 } from "../api";
import { columns, columns1, mTypes } from "../const";
import { Item, GUpiaoItem } from "../types";
import { bubbleSort, getData, quchong } from "../utils";
// import Text from './Text';
export default defineComponent({
  setup(props) {
    const radio = ref("资金面");
    const selectValue = ref(["资金面"]);

    const tableData = reactive<{
      list: Item[];
      loading: boolean;
      gupiaoLoading: boolean;
      selectRowData: string[];
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
    onMounted(() => {
      init();
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
      return record.type.map((tag, idx) => {
        return (
          <a-tag class={styles.tag} key={record.code + idx} color="purple">
            {tag}
          </a-tag>
        );
      });
    };

    const selectionChange = (rowKeys: string[]) => {
      tableData.selectRowData = rowKeys;
      console.log(tableData.selectRowData);
    };
    watch(
      () => radio.value,
      (newVlue, oldValue) => {
        if (newVlue !== oldValue) radioChange(newVlue);
      }
    );

    watch(
      () => selectValue.value,
      (newVlue, oldValue) => {
        if (newVlue.length !== oldValue.length) {
          selectValueChange(newVlue);
          return;
        }
        for (let index = 0; index < newVlue.length; index++) {
          const element = newVlue[index];
          if (element !== oldValue[index]) {
            selectValueChange(newVlue);
            return;
          }
        }
      }
    );
    const radioChange = async (v: string) => {
      let result = v === "大师" ? await getMaster() : await 获取资金面(v);
      tableData.list = getData(result);
    };
    const selectValueChange = async (array: string[]) => {
      tableData.loading = true;
      tableData.list = [];
      let temp: any = [];
      for (let index = 0; index < array.length; index++) {
        const v = array[index];
        let result = v === "大师" ? await getMaster() : await 获取资金面(v);
        temp = [...getData(result), ...temp];
      }
      tableData.list = temp;
      tableData.loading = false;
    };

    const handleClick = async () => {
      try {
        tableData.gupiaoLoading = true;
        tableData.visible = true;
        tableData.guPiaoList = [];
        let dataList: GUpiaoItem[] = [];
        for (let index = 0; index < tableData.selectRowData.length; index++) {
          const obj = JSON.parse(tableData.selectRowData[index]);
          let result1 = await getDetail(obj.query);
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
              type: obj.name,
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

    const handleOk = () => {
      tableData.visible = false;
    };

    const renderquery = ({ record }: { record: Item }, key: keyof Item) => {
      return (
        <a-popover
          v-slots={{
            default: () => <a-button>Hover Me</a-button>,
            content: () => <div class={styles.query}>{record[key]}</div>,
          }}
        ></a-popover>
      );
    };

    const reset = async () => {
      radio.value = "资金面";
      selectValue.value = ["资金面"];
    };

    const init = async () => {
      try {
        radio.value = "资金面";
        selectValue.value = ["资金面"];
        let result = await 获取资金面(radio.value);
        tableData.list = getData(result);
      } catch (error) {
        console.log(error);
      }
    };
    const change = (data: any, extra: any) => {
      console.log("data change", { data, extra });
    };
    return () => {
      return (
        <>
          <div style={styles.box}>
            <a-drawer width="fit-content" vModel:visible={tableData.visible} onOk={handleOk}>
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
            <div class={styles.header}>
              <a-button onClick={reset}>重置</a-button>
              <a-radio-group type="button" defaultValue="资金面" v-model:modelValue={radio.value}>
                {mTypes.map((item) => {
                  return (
                    <a-radio key={item} value={item}>
                      {item}
                    </a-radio>
                  );
                })}
              </a-radio-group>
              <a-button disabled={tableData.selectRowData.length === 0} onClick={handleClick}>
                查看选中股票
              </a-button>
              <a-select
                v-model:modelValue={selectValue.value}
                default-value={["资金面"]}
                style={{ width: "500px" }}
                placeholder="Please select ..."
                multiple
              >
                {mTypes.map((item) => {
                  return (
                    <a-option key={item} value={item}>
                      {item}
                    </a-option>
                  );
                })}
              </a-select>
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
                  query: ({ record }: { record: Item }) => renderquery({ record }, "query"),
                  desc: ({ record }: { record: Item }) => renderquery({ record }, "desc"),
                }}
                onChange={change}
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
