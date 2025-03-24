import { render } from "@testing-library/react";
import React from "react";

const Home = () => {
    return (
        <div className="ms-10 me-10">
            <div className="flex flex-row text-xl gap-3 text-center text-white">
                <div className="basis-64 bg-purple-500 rounded-md py-1">
                    <p className="ordinal slashed-zero">1st, 0</p>
                </div>
                <div className="basis-64 bg-purple-500 rounded-md py-1">02</div>
                <div className="basis-96 bg-purple-500 rounded-md py-1">03</div>
            </div>
        </div>
    )
}

export default Home;