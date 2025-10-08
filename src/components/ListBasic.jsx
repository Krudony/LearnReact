const ListBasic = (props) => {
  const { kaika } = props;
  console.log(kaika);
  return (
    <div>
      ListBasic
      {kaika.map((el,i) => {
        return <h1 key={i}>{el.name}</h1>;
      })}
    </div>
  );
};
export default ListBasic;
