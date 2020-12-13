import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([]);

	useEffect(()=>{
		calculateTotal();		
	},[items])

	useEffect(()=>{
		const localItems=JSON.parse(localStorage.getItem('shopping'));
		if(localItems){
			setItems(localItems);
		}
	},[])

	const [inputValue,setInputValue]=useState("");
	const [totalItemCount,setTotalItemCount]=useState(0);

	const handleAddButtonClick=()=>{
		const newItem={itemName:inputValue,quantity:1,isSelected:false};
		const newItems=[...items,newItem];
		setItems(newItems);
		saveToLocalStorage(newItems);
		setInputValue("");
	}

	const saveToLocalStorage=(items)=>{
		localStorage.setItem("shopping",JSON.stringify(items))
	}

	const handleQuantityIncrease=(index)=>{
		const newItems=[...items];
		newItems[index].quantity++;
		setItems(newItems);
	}

	const handleQuantityDecrease=(index)=>{
		const newItems=[...items];
		newItems[index].quantity--;
		setItems(newItems);
	}

	const toggleComplete=(index)=>{
		const newItems=[...items];
		newItems[index].isSelected=!newItems[index].isSelected;
		setItems(newItems);
	}

	const calculateTotal=()=>{
		const totalCount=items.reduce((total,item)=>{
			return total+item.quantity;
		},0)
		setTotalItemCount(totalCount);
	}

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} 
					className='add-item-input' 
					placeholder='Add an item...' />
					<FontAwesomeIcon onClick={handleAddButtonClick} icon={faPlus} />
				</div>
				<div className='item-list'>
					{items.map((item,index)=>(
						<div className='item-container'>
						<div className='item-name' onClick={()=>toggleComplete(index)}>
							{item.isSelected ? (
								<React.Fragment>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.itemName}</span>
								</React.Fragment>
							) : (
								<React.Fragment>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.itemName}</span>
								</React.Fragment>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon 
								onClick={()=>handleQuantityDecrease(index)} 
								icon={faChevronLeft} />
							</button>
							<span> {item.quantity} </span>
							<button>
								<FontAwesomeIcon 
								onClick={()=>handleQuantityIncrease(index)}
								 icon={faChevronRight} />
							</button>
						</div>
					</div>
					))}
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;
