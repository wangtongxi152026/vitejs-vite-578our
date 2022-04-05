import { reactive, ref, defineComponent, onMounted, computed, watch, defineProps } from "vue";
import styles from "./a.module.css";
import { getDetail, 获取资金面 } from "../api";
import { Item, GUpiaoItem } from "../types";
import { bubbleSort } from "../utils";
const buttonProps = {
  tableData: Array,
};
export default defineComponent({
  props: buttonProps,
  setup(props) {
    const columns = [
      {
        title: "#",
        width: "60",
        dataIndex: "key",
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
        dataIndex: "收盘价",
      },
      {
        title: "上市板块",
        width: "200",
        dataIndex: "上市板块",
      },
    ];

    const radio = ref("资金面");

    const tableData = reactive<{ list: Item[]; loading: boolean; selectRowData: number[]; visible: boolean }>({
      list: [],
      loading: false,
      visible: false,
      selectRowData: [],
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

    const selectionChange = (rowKeys: number[]) => {
      console.log({ rowKeys });
      tableData.selectRowData = rowKeys;
    };

    return () => {
      console.log({ tableData: props.tableData });
      return (
        <a-table
          loading={tableData.loading}
          columns={columns}
          data={props.tableData}
          //   row-selection={{
          //     type: "checkbox",
          //     showCheckedAll: true,
          //   }}
          //   v-slots={{
          //     tags: renderTags,
          //     annualizedYield: ({ record }: { record: Item }) => renderAnnualizedYield({ record }, "annualizedYield"),
          //     profitAndList: ({ record }: { record: Item }) => renderAnnualizedYield({ record }, "profitAndList"),
          //     drawnDown: ({ record }: { record: Item }) => renderAnnualizedYield({ record }, "drawnDown"),
          //   }}
          onSorterChange={sorterchange}
          pagination={false}
        />
      );
    };
  },
});
