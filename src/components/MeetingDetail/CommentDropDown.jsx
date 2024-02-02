import React, { useState, useRef, useEffect } from 'react';
import moreVerticle from '../../assets/MeetingDetail/more-vertical.png';
import styled from 'styled-components';

const CommentDropdown = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = () => {
        onEdit();
        setIsOpen(false);
    };

    const handleDelete = () => {
        onDelete();
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <StCommentDropdown ref={menuRef}>
            <DropdownButton onClick={handleToggleDropdown}>
                <img
                    src={moreVerticle}
                    alt="수정/삭제 버튼"
                    style={{
                        width: '24px',
                        height: '30px',
                        marginTop: '-20px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                />
            </DropdownButton>

            {isOpen && (
                <MenuBox>
                    <StEditButton onClick={handleEdit}>댓글 수정</StEditButton>
                    <StDeleteButton onClick={handleDelete}>댓글 삭제</StDeleteButton>
                </MenuBox>
            )}
        </StCommentDropdown>
    );
};

const StCommentDropdown = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const DropdownButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const MenuBox = styled.div`
    position: absolute;
    top: 65%;
    left: -65%;
    width: 84px;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #ededed;
    z-index: 999;
`;

const StEditButton = styled.button`
    width: 84px;
    height: 27px;
    margin-left: -10px;
    white-space: nowrap;
    &:hover {
        background-color: var(--button-border-color);
        color: white;
    }
`;

const StDeleteButton = styled.button`
    width: 84px;
    height: 27px;
    margin-left: -10px;
    white-space: nowrap;
    &:hover {
        background-color: var(--button-border-color);
        color: white;
    }
`;

export default CommentDropdown;
