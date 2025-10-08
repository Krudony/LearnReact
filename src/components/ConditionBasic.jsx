// rafce
const ConditionBasic = () => {
  // JS
  console.log(Boolean(""));
  console.log(Boolean(0));
  console.log(Boolean(null));
  console.log(Boolean(NaN));
  console.log(Boolean(undefined));

  // OR "||" finds the first truthy value
  const user = "USER";
  // AND “&&” finds the first falsy value
  // if(condition){
  //     // true
  // }else{
  //     // false
  // }
  return (
    <div>
      {user === "ADMIN"
        ? "Welcome ADMIN"
        : user === "USER"
        ? "Welcome User"
        : "Welcome Guest"}
    </div>
  );
};
export default ConditionBasic;
