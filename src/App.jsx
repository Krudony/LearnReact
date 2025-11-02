import BasicUseReducer from "./components/BasicUseReducer";
import BasicUseReducer2 from "./components/BasicUseReducer2";
import ConditionBasic from "./components/ConditionBasic";
import FetchBasic from "./components/FetchBasic";
import FormInput from "./components/FormInput";
import ListBasic from "./components/ListBasic";
import Test from "./components/Test";
import UseEffectBasic from "./components/UseEffectBasic";

// rafce
const App = () => {
  const users = [
    { id: 1, name: "Roitai" },
    { id: 2, name: "DEV" },
  ];

  return (
    <>
      {/* <FormInput />
      <ListBasic kaika={users} />
      <UseEffectBasic />
      <FetchBasic />
      <ConditionBasic />
      <BasicUseReducer /> */}
      <BasicUseReducer2 />
      <Test/>
    </>
  );
};
export default App;
