import styled, { css } from 'styled-components';
import profileImage from './image.png';
import { addDoc } from 'firebase/firestore';

export default function Avatar({ src, size, className }) {
    return (
        <AvatarFigure size={size} className={className}>
            <img src={src ?? profileImage} alt="아바타이미지" />
        </AvatarFigure>
    );
}

const AvatarFigure = styled.figure`
    ${(props) => {
        switch (props.size) {
            case 'large':
                return css`
                    width: 80%;
                    height: 80%;
                    margin: 0px 56px 0px 0px;
                    border-radius: 50%;
                    background: lightgray 50% / cover no-repeat, #d9d9;
                `;
            default:
                return css`
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                `;
        }
    }}

    & img {
        width: 95%;
        height: 95%;
        margin: 20px 0px 20px 40px;
        overflow: hidden;
        border-radius: 50%;
    }
`;
