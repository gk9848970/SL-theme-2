import React from 'react';
import Expire from './component/Exipre';
import * as api from './Api';
import { useState, useEffect } from 'react';

export default function App2() {
    const [id, setId] = useState('');
    const [domain, setDomain] = useState('');
    const [expire, setExpire] = useState('');
    const [status, setStatus] = useState(false);
    useEffect(() => {
        // setDomain(window.location.href)
        setDomain('https://commerce.educms.in/');
        // setDomain('https://edulyn.educms.in')
        getWebHash();
    }, [domain]);
    const getWebHash = async () => {
        let str = domain.split('/');
        let temp = str[2];
        if (temp != '') {
          api
            .fetchWebHash(temp)
            .then((data) => {
              if (data.status === 'success') {
                setId(data.response[0].inst_hash);
                setExpire(data.response[0].expiry_date);
                setStatus(true);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
    };
    return(
        <div>
            <Expire/>
        </div>
    );
}

