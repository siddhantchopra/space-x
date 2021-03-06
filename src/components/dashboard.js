import React, {useState, useEffect, useLayoutEffect} from 'react'
import { Filter } from './filter'
import { Cards } from './cards'
import axios from 'axios'
import {baseURL} from './constant'

let cancelToken;

export const Dashboard = (props) => {
    let [data, setData] = useState()
    let [isLoading, setLoading] = useState(true)

    useLayoutEffect(()=>{ 
        axios.get(baseURL+'?land_success=&launch_year=&launch_success=&limit=100').then((res)=>{
            let arr = []
            arr.push(res.data)
            setData(...arr)
            setLoading(false)
            props.history.push('/search')
        })
    },[])
    
    const getData=(obj)=>{
        setLoading(true)
        if(Object.keys(obj).length > 0){
             let query = `?land_success=${obj.land ?obj.land : ''}&launch_year=${obj.year ?obj.year:''}&launch_success=${obj.launch ?obj.launch: ''}&limit=100`
            //  let query = `${obj.launch ?'&launch_success='+obj.launch: ''}${obj.land ?'&land_success='+obj.land : ''}${obj.year ?'&launch_year='+obj.year:''}`
            let url =`${baseURL+query}`
               
                if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel("Operation canceled due to new request.");
                  }
           
                  cancelToken = axios.CancelToken.source();

            axios.get(url,  { cancelToken: cancelToken.token }).then((res)=>{
                let arr = []
                arr.push(res.data)
                setData(...arr)
                props.history.push('/search?'+query)
                setLoading(false)
            }).catch(error => {
                if (axios.isCancel(error)) {
                  console.log('Request canceled', error);
                } else {
                  console.log(error);
                }
             });

        }
    }
 
    return (
        <div className="container-fluid">
            <h2 className="pl-2 head">SpaceX Launch Programs</h2>
            <div className="row">
                <div className="col-lg-3 col-xl-2 col-md-4 col-sm-12"><Filter filterObject={getData}/> </div>
            {isLoading && <h3 className="text-center">Loading...    </h3>}
               {!isLoading && <div className="col-lg-9 col-xl-10 col-md-8 col-sm-12"><Cards data={data}/></div>}
            </div>
            <h3 className="text-center">Developed By: Siddhant Chopra</h3>
        </div>
    )
}
