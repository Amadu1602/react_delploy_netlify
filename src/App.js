import { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './index.css';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest'

function App() {
  const API_URL = "http://localhost:3500/items";

  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []); //Loading from local storage
  const [items, setItems] = useState([]); //Loading from local storage
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   // setItems(JSON.parse(localStorage.getItem('shoppinglist')))
  //   localStorage.setItem('shoppinglist', JSON.stringify(items));
  // },[items]);

  useEffect (() => {
    // Fetching data from the db.json file
    const fetchItems = async () => {
      try {
        const response =  await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    // setTimeout function added to simulate delay in fetching data from API
    setTimeout(() =>{
      (async () => await fetchItems())();
    }, 2000)
    
    // (async () => await fetchItems())();
  }, [])


  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    // alert(`key: ${id}`)
    const listItems = items.map((item) => item.id === id? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    // alert(id)
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems)

    const deleteOptions= {
      method: 'DELETE'
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

    // adding a new item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
    // setAndSaveItems(listItems)
  } 

  return (
    <div className="App">
      <Header title="Grocery List" /> {/* Header component imported from the Header.js file */}

      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        { isLoading && <p>Loading items...</p> }
        { fetchError && <p style={{ color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={ items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
          handleCheck = { handleCheck }
          handleDelete = { handleDelete }

        />} {/* Content component imported from the Content.js file */}
      </main>
      <Footer 
        length = {items.length}
      /> {/* Footer component imported from the Footer.js file */}
    </div>
  );
}

export default App;
