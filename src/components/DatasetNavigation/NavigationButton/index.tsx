// import interfaces
import { IMethod, INavigationButton, ISubset } from "Interfaces";
// import modules and components
import NavigationButtonSubset from "./NavigationButtonSubset";
import NavigationButtonMethod from "./NavigationButtonMethod";

export default function NavigationButton(props: INavigationButton) {
  const { onClick, data } = props;

  return props.data.type === "subset" ? (
    <NavigationButtonSubset onClick={onClick} data={data as ISubset} />
  ) : (
    <NavigationButtonMethod onClick={onClick} data={data as IMethod} />
  );
}
