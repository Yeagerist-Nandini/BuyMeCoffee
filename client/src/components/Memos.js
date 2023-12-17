import React from 'react'
import { useState, useEffect } from 'react'
import "./Memos.css"

function Memos({ state }) {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const memoMessage = async () => {
            const memos = await contract.getMemos();
            setMemos(memos);
        };

        contract && memoMessage();
    }, [contract]);

    return (
        <div>
            <div className='memo'>Memos</div>
            {memos.map((memo) => {
                return (
                    <table key={Math.random()}>
                        <tbody>
                            <tr>
                                <td style={{width:"100px"}}>{memo.name}</td>
                                <td style={{width:"800px"}}>{memo.mssg}</td>
                                <td style={{width:"300px"}}>{new Date(Number(memo.timestamp) * 1000).toLocaleString()}</td>
                                <td style={{width:"400px"}}>{memo.from}</td>
                            </tr>
                        </tbody>
                    </table>
                )
            })}
        </div>
    )
}

export default Memos