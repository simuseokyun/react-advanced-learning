import { useState } from 'react';
import styled from 'styled-components';

export const Form = () => {
    const [value, setValue] = useState('');
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setValue(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} placeholder="userName" onChange={onChange} />
                <button>Log in</button>
            </form>
        </div>
    );
};
