import React, { useRef } from 'react';
import "./UI.css";
import { CSSTransition } from 'react-transition-group';


const ServerResponseTable = ({ responseData }) => {
  const tableRef = useRef(null);

  return (
    <>
      <h2>This is your plan for a {responseData.dayToFoods.length > 1 ? <p>{responseData.dayToFoods.length} days</p> : <p>{responseData.dayToFoods.length} day</p>} </h2>
      <CSSTransition
        nodeRef={tableRef}
        in={true}
        appear={true}
        timeout={400}
        classNames="slide-in-fwd-center"
      >
        <table ref={tableRef} className="table">
          <tbody>
            {responseData.dayToFoods.map((dayFood, index) => (
              <tr key={index}>
                <td colSpan="4">
                  <table>
                    <tbody className="tableBody">
                      <tr>
                        <td className='day'>Day {dayFood.day}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className='day'>Total Calories:</td>
                        <td className='day'>{dayFood.dayStats.ccal}</td>
                      </tr>
                      <tr>
                        <td className='day'>Total Protein:</td>
                        <td className='day'>{dayFood.dayStats.protein}</td>
                      </tr>
                      <tr >
                        <td className='day'>Total Fat:</td>
                        <td className='day'>{dayFood.dayStats.fat}</td>
                      </tr>
                      <tr>
                        <td className='day'>Total Carbs:</td>
                        <td className='day'>{dayFood.dayStats.carbs}</td>
                      </tr>

                      {dayFood.foods.map((foodItem, foodIndex) => (
                        <React.Fragment key={foodIndex}>
                          <tr className={`tdName-${foodIndex % 6}`}>
                            <td>{foodItem.name}</td>
                            <td></td>
                          </tr>
                          <tr className='tdProtein'>
                            <td>Protein:</td>
                            <td>{foodItem.protein}</td>
                          </tr>
                          <tr className='tdFat'>
                            <td>Fat:</td>
                            <td>{foodItem.fat}</td>
                          </tr>
                          <tr className='tdCarbs'>
                            <td>Carbs:</td>
                            <td>{foodItem.carbs}</td>
                          </tr>
                          <tr className='tdCcal'>
                            <td>Calories:</td>
                            <td>{foodItem.ccal}</td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CSSTransition>
    </>
  );
};

export default ServerResponseTable;



