import ConditionBasic from "./components/ConditionBasic";
import FetchBasic from "./components/FetchBasic";
import FormInput from "./components/FormInput";
import ListBasic from "./components/ListBasic";
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
      <FetchBasic /> */}
      <ConditionBasic />
    </>
  );
};
export default App;
