import styled from 'styled-components';

export const StyledTypeDescription = styled.div`
    font-size: 20px;
    color: ${(props) => getTextColor(props.result)};
    background-color: #fff;
    height: 102px;
    width: 583px;
    display: flex;
    text-align: left;
`;

function getTextColor(result) {
    switch (result) {
        case 'ENTJ':
            return '#62506D';
        case 'ENTP':
            return '#62506D';
        case 'INTJ':
            return '#62506D';
        case 'INTP':
            return '#62506D';

        case 'ESFP':
            return '#F19A4F';
        case 'ISTP':
            return '#F19A4F';
        case 'ISFP':
            return '#F19A4F';
        case 'ESTP':
            return '#F19A4F';

        case 'ESFJ':
            return '#449DE4';
        case 'ESTJ':
            return '#449DE4';
        case 'ISFJ':
            return '#449DE4';
        case 'ISTJ':
            return '#449DE4';

        case 'ENFP':
            return '#6BBB43';
        case 'INFJ':
            return '#6BBB43';
        case 'INFP':
            return '#6BBB43';
        case 'ENFJ':
            return '#6BBB43';
        default:
            return '#000000'; // 기본적으로는 검은색
    }
}
