
import AdminLayout from "./adminLayout";
import PublicLayout from "./publicLayout";
import LoginLayout from "./loginLayout";

const layouts = {
  public: PublicLayout,
  admin:  AdminLayout,
  login: LoginLayout
};

const LayoutWrapper = (props) => {
    // console.log("props============>"+props.children.type.layout)
  // to get the text value of the assigned layout of each component
  const Layout = layouts[props.children.type.layout];
  // if we have a registered layout render children with said layout
  if (Layout != null) {
    return <Layout {...props}>{props.children}</Layout>;
  }
  // if not render children with fragment
  return <PublicLayout {...props}>{props.children}</PublicLayout>;
};

export default LayoutWrapper;
