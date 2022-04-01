import { Transition, ref, defineComponent } from 'vue';
export default defineComponent({
  setup(props) {
    // 只有点击时执行
    // const count = ref(999);
    const changeCount = () => {};

    return () => (
      <>
        <div onClick={changeCount}>
          div
          {/* {count} */}
        </div>
      </>
    );
  },
});
