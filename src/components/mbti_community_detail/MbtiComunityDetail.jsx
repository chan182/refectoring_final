import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { React, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { communityDetailGetDate, deleteBoard } from '../../api/boardDetail';
import heart from '../../assets/community/blackheart.svg';
import eyeImoge from '../../assets/community/eyeImoge.svg';
import messageImoge from '../../assets/community/messageImoge.svg';
import modal_logo from '../../assets/home/mbti_community.png';
import { userAtom } from '../../recoil/Atom';
import Loading from '../common/Loading';

const MbtiComunityDetail = () => {
    const user = useRecoilValue(userAtom);
    const params = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    // 데이터 가져오기
    const { isLoading, data } = useQuery({
        queryKey: ['commnuity'],
        queryFn: () => communityDetailGetDate(params.id)
    });

    // 삭제하기
    const mutation = useMutation({
        mutationFn: (paramsId) => deleteBoard(paramsId),
        onSuccess: () => {
            queryClient.invalidateQueries('commnuity');
            navigate('/mbti/community');
        }
    });
    const handleDeleteCommunity = async () => {
        Swal.fire({
            imageUrl: modal_logo,
            title: '정말 삭제하시겠습니까?',
            showDenyButton: true,
            confirmButtonText: 'YES'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ imageUrl: modal_logo, title: '삭제되었습니다.' });
                mutation.mutate(params.id);
            }
        });
    };

    // // 수정하기
    // const UpdateMutation = useMutation((paramsId, title) => updateBoard(paramsId, title), {
    //     onSuccess: (data) => {
    //         queryClient.invalidateQueries('communities');
    //     }
    // });

    // const handleUpdateCommunity = async (paramsId) => {
    //     console.log(title);
    //     UpdateMutation.mutate(paramsId, title);
    // };

    // 데이터 로딩 !
    if (isLoading) {
        return <Loading />;
    }

    return (
        <StCardWrapper>
            <StCardImage src={data?.communityImage} alt="컨텐츠의 사진" />
            <StTitleWrapper>
                {editMode ? (
                    <StInput
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                ) : (
                    <StCardTitle>{data?.title}</StCardTitle>
                )}

                {/* <img src={redheart} alt="" /> */}
            </StTitleWrapper>
            <StuserInfoWrapper>
                <StUserInformation>
                    <StprofileImg src={data?.ImageUrl} alt="" />
                    <StLike>
                        {data?.nickname} / {data?.mbti}
                    </StLike>
                </StUserInformation>
                <StlikeInformation>
                    <img src={heart} alt="좋아요 이미지" />
                    {data?.likecount}
                </StlikeInformation>
                <StMessageInformation>
                    <img src={messageImoge} alt="" />
                    <div>0</div>
                </StMessageInformation>
                <StViewInformation>
                    <img src={eyeImoge} alt="" />
                    <div>0</div>
                </StViewInformation>
            </StuserInfoWrapper>
            <StButtonWrapper>
                {user?.uid === data?.id ? (
                    <>
                        <Stbutton onClick={() => navigate(`/mbti/community/edit/${params.id}`)}>글 수정</Stbutton>
                        <Stbutton onClick={handleDeleteCommunity}>글 삭제</Stbutton>
                    </>
                ) : (
                    <></>
                )}
            </StButtonWrapper>
            <StHr />
            <StContent>
                {editMode ? (
                    <StInput
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                ) : (
                    <StCardTitle>{data?.content}</StCardTitle>
                )}
            </StContent>
            {editMode ? (
                <>
                    <button
                        onClick={() => {
                            // handleUpdateCommunity(params.id);
                        }}
                    >
                        등록하기
                    </button>
                    <button
                        onClick={() => {
                            setEditMode(!editMode);
                        }}
                    >
                        취소하기
                    </button>
                </>
            ) : (
                <></>
            )}
        </StCardWrapper>
    );
};

export default MbtiComunityDetail;

const StCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1200px;
    border-radius: 26px;
    border: 1px solid #ededed;
    background: #fff;
    margin: 68px auto 40px;
`;

const StCardImage = styled.img`
    width: 468px;
    height: 468px;
    border-radius: 16px;
    padding: 2rem;
    border-radius: 1rem;
`;

const StTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0px auto 14px 32px;
`;

const StCardTitle = styled.div`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
`;

const StuserInfoWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 48px;
    margin: 0px auto 0px 32px;
    width: 100%;
`;

const StUserInformation = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const StprofileImg = styled.img`
    width: 38px;
    height: 38px;
    fill: #efefef;
    stroke-width: 1px;
    stroke: #8d8d8d;
    border-radius: 50%;
`;

const StLike = styled.div`
    color: #4e4e4e;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
`;

const StlikeInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StMessageInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StViewInformation = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;

const StButtonWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 32px;
    gap: 4px;
`;

const Stbutton = styled.button`
    width: 76px;
    height: 34px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #f8f8f8;
    color: #969696;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.3px;
`;

const StHr = styled.div`
    width: 1104.002px;
    height: 1px;
    background: #ececec;
    margin: 26px 48px 44px 48px;
`;

const StContent = styled.div`
    width: 1136px;
    color: #121212;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
    margin: 0px 32px 68px 32px;
`;

const StInput = styled.input`
    display: flex;
    width: 100%;
    padding: 10px;
    align-items: flex-start;
    border-width: 0 0 1px;
    gap: 10px;
    color: #4e4e4e;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 23.68px */
    letter-spacing: -0.08px;
`;
