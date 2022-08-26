import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.scss'
import List from '../list/list';
import NavBar from '../nav/nav';
import ListContainer from '../list/listContainer';
import Featured from '../featured/featured';
import listData from '../list/listData';


const App = () => {

  return (
    <div className="App">
      <NavBar />
      <Featured  />
      <List listType={listData}/>
      <List listType={listData}/>
    </div>
  );
}

export default App;
