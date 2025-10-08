// rafce
const Book = ({ data }) => {
  return (
    <div>
      {data.map((el) => {
        // fn body
        return <li key={el.id}>{el.name}</li>;
      })}
    </div>
  );
};
export default Book;
