import React, { useEffect, useState } from 'react'

export const Filter = (props) => {
    let [filterData, setFilter] = useState([])
    let [getObj, setObj] = useState({})
    let [action, setActive] = useState({})
    useEffect(() => {
        let arr = []
        for (let i = 2006; i <= 2020; i++) {
            arr.push(i)
        }
        setFilter(arr)
    }, [])
    const handleClick = (e) => {
        let name = e.target.name
        let val = e.target.value
        let option = {
            ...getObj,
            [name]: val
        }
        setObj(option)
    }
    useEffect(()=>{
        props.filterObject(getObj)
    },[getObj])
    return (
        <div className="filter mb-3">
            <h3 className="pl-2">Filters </h3>
            <p className="mb-2">Launch Year</p>
            <div className="year text-center">
            <div className="year-container">
                {filterData && filterData.map((data) => <button className={`btn mb-1 ${getObj.year == data ?'active': ''}`} key={data} name="year" value={data} onClick={handleClick}>{data}</button>)}
            </div>
            </div>
                <p className="mb-2">Successful Launch</p>
                <div className="year text-center">

            <div className="year-container">
                <button className={`btn mb-1 ${getObj.launch == "true"? 'active': ''}`} value="true" name="launch" onClick={handleClick}>True</button>
                <button className={`btn mb-1 ${getObj.launch == "false"? 'active': ''}`} value="false" name="launch" onClick={handleClick}>False</button>
            </div>
            </div>
                <p className="mb-2">Successful Landing</p>
                <div className="year text-center">
            <div className="year-container">
                <button className={`btn mb-1 ${getObj.land == "true"? 'active': ''}`} value="true" name="land" onClick={handleClick}>True</button>
                <button className={`btn mb-1 ${getObj.land == "false"? 'active': ''}`} value="false" name="land" onClick={handleClick}>False</button>
            </div>
            </div>
        </div>
    )
}
