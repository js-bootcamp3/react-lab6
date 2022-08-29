import React, {useState} from 'react'

function Products() {
  const [list, setList] =useState([
    {id: 1, name: 'text'},
    {id: 2, name: 'active'},
  ])
  const [edit, setEdit] = useState(null)

  const handleTarget = (e) => {
    const {value} = e.target;
    const newItem = {...edit};
    newItem.name = value;

    setEdit(newItem)
  }

  const handleSave = () => {
    const array = list.map(item => {
      if (item.id === edit.id) {
        item.name = edit.name
      }
      return item
    })
    setList(array)
    setEdit(null)
  }

  return (
    <div>
      <h1>Products</h1>
        <div>
          {list.map(item => 
            <ProductItem 
              item={item}
              onEdit={() => setEdit(item)} 
              target={edit} 
              onTargetEdit={handleTarget}
              onSave={handleSave}
            />
          )}
        </div>
    </div>
  )
}

const ProductItem = ({item, onEdit, target, onTargetEdit, onSave}) => {

  const handleKeyDown = (key) => {
    if (key.code === 'Enter') {
      onSave()
    }
  }

  return (
    <div>
      {target?.id === item.id 
      ?  <input 
            type="text" 
            value={target.name}
            onChange={onTargetEdit}
            onKeyDown={handleKeyDown}
          /> 
      :  <span onClick={onEdit} >{item.name}</span>
      }
    </div>
  )
}

export default Products
