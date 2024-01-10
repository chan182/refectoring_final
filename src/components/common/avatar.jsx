import styled, { css } from 'styled-components';
import profileImage from './image.png';

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
                    width: 250px;
                    height: 250px;
                    margin: 10px 50px 10px 50px;
                    border-radius: 346px;
                    background: lightgray 50% / cover no-repeat, #d9d9;
                `;
            default:
                return css`
                    width: 50px;
                    height: 50px;
                `;
        }
    }}

    border-radius: 50%;
    overflow: hidden;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;
