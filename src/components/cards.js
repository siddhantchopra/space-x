import React from 'react'

export const Cards = (props) => {

    return (<div className="row">
        {
             props.data!== undefined && props.data.length > 0 ? props.data.map((data) => {
                return <div className="col-lg-4 col-xl-3 col-md-6 col-sm-12" key={data.flight_number}><div className="card mb-2">
                    <div className="card-body">
                        <div className="card-img-top mb-2">
                    <img src={data.links.mission_patch_small} alt={data.flight_number} />
                            </div>

                        <h5 className="card-title">{`${data.mission_name} #${data.flight_number}`}</h5>
                        <p className="card-text">Mission Id's</p>
                        {data.mission_id.length > 0 && <ul>{data.mission_id.map((data, index) => <li key={index}>{data}</li>)}</ul>}
                        <p className="card-text">Launch Year: <span>{data.launch_year}</span></p>
                        <p className="card-text">Successful Launch: <span>{data.launch_success? 'True': 'False'}</span></p>
                        <p className="card-text">Successful Landing: <span>{data.launch_landing? 'True': 'False'}</span></p>
                    </div>
                </div></div>
            }) :  props.data!== undefined && <h3>No Data Found</h3>
        }
    </div>
        
       
    
          
    )
}
