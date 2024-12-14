import "./InfoFillItem.scss";
export default function InfoFillItem({ index, title }) {
  return (
    <div className="info-fill-item">
      <h3 className="title">
        <span className="title-wrapper-sort">
          <span className="icon-suffix">{index}</span>
          <p>{title}</p>
        </span>
      </h3>
    </div>
  );
}
