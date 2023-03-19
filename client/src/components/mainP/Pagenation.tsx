import React from 'react';
import styled from 'styled-components';
import NextPageIcon from '../../assets/common/NextPageIcon';
import PrevPageIcon from '../../assets/common/PrevPageIcon';

// interface {
//     dataPerPage:number,
//     totalData:number,
//     paginate:number,
// }

const Pagination = () => {
  //   const [activePage, setActivePage] = useState(1);
  //   const pageNumbers = [];

  //   for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
  //     pageNumbers.push(i);
  //   }

  //   const handleClick = (event, number) => {
  //     event.preventDefault();
  //     setActivePage(number);
  //     paginate(number);
  //   };
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Pages>
      <ul className="pagination">
        <PrevPageIcon />
        {pageNumbers.map((number) => (
          <li
            key={number}
            // className={`page-item${number === activePage ? " active" : ""}`}
          >
            <Link
              href="#"
              className="page-link"
              //   onClick={(event) => handleClick(event, number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <NextPageIcon />
      </ul>
    </Pages>
  );
};

export default Pagination;

const Pages = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  ul {
    display: flex;
    min-width: 500px;
    justify-content: space-evenly;
  }
`;
const Link = styled.a`
  color: #7b7b7b;
  :hover {
    color: #adb0b6;
  }
`;
