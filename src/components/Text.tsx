import { defineComponent} from "vue";

const buttonProps = {
  value: String,
};
export default defineComponent({
  props: buttonProps,
  setup(props) {
    return () => {
      return (
        <a-typography>
          <a-typography-paragraph copyable>{props.value}</a-typography-paragraph>
        </a-typography>
      );
    };
  },
});
