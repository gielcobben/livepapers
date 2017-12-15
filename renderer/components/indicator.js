const Indicator = ({ total, current }) => (
  <ul>
    {Array.apply(0, Array(total)).map((item, index) => (
      <li key={index} className={current - 1 === index ? "active" : ""} />
    ))}

    <style jsx>{`
      ul {
        position: absolute;
        bottom: 0;
        left: 50%;
        list-style: none;
        display: flex;
        transform: translate3d(-50%, 0, 0);
      }

      li {
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: var(--grey-light);
        margin: 0 4px;
      }

      li.active {
        background: var(--black);
      }
    `}</style>
  </ul>
);

export default Indicator;
