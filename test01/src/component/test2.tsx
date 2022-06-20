import React, {useState, useEffect, useMemo} from 'react';
import moment from "moment";
import SocketIO from "../../../constants/socket";
import Header from "../../common/header";
import Loading from "../../common/loading";
import LoginPopup from "../../login/popup/login";
import ReviewBlockConfirmPopup from "../review/popup/blockConfirm";
import Popup from "../../common/popup";
import history from "../../../constants/history";
import * as Utils from "../../../constants/utils";
import * as LocalStorage from "../../../constants/localStorage";
import Api from "../../../api/api";
import { useLocation } from "react-router";

const ENCRYPTION_TYPE = process.env.REACT_APP_ENCRYPTION_TYPE;

let limit: number = 40;
let socket: SocketIO;
const List = () => {
    

    const { state } = useLocation();

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [reviewId] = useState(Utils.isEmpty(state) ? 0 : state.reviewId);
    const [curPage, setCurPage] = useState(1);
    const [pageTotal, setPageTotal] = useState(0);
    const [reviewList, setReviewList] = useState<any[]>([]);
    const [reviewItemMenu, setReviewItemMenu] = useState({ //## 후기 메뉴 노출 분기
        reviewId: 0,
        active: false
    });
    const [loginPopup, setLoginPopup] = useState({ //## 로그인 유도 팝업
        classActive: ""
    });
    // const [reviewBlockConfirmPopup, setReviewBlockConfirmPopup] = useState({ //## 보호자님이 남긴 후기 차단 확인 팝업
    //     classActive: "",
    //     reviewId: 0
    // });

    const [popup, setPopup] = useState({
        classActive: "",
        type: "",
        btnType: "",
        content: ""
    });

    //##################################################################################################################
    //##
    //## >> Override
    //##
    //##################################################################################################################

    useEffect(() => {
        window.ourComponent = interfaceMethod;
        window.addEventListener("scroll", scrollListener);
        return () => {
            window.removeEventListener("scroll", scrollListener);
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!Utils.isAuthCheck()) {
            //## userId 확인 - 마이페이지 API 호출
            userInfoApi();
        }

        socket = new SocketIO("P-PRD");
        return () => {
            if (socket != null) {
                socket.viewStay();
            }
        }
    }, []);

    /**
     * 현재 페이지 변경시 호출
     * -----------------------------------------------------------------------------------------------------------------
     */
    useEffect(() => {
        reviewListDetail(curPage);
    }, [curPage]);

    //##################################################################################################################
    //##
    //## >> Method : Private
    //##
    //##################################################################################################################



     const popupAction = (type: string) => {
            dispatch(hidePopup());
        };

    /**
     * Scroll Listener
     * -----------------------------------------------------------------------------------------------------------------
     */
    const scrollListener = () => {
        const scrollHeight = document.documentElement.scrollHeight; //## 화면에 보이지 않는 높이도 포함된 페이지의 총 높이
        const scrollTop = document.documentElement.scrollTop; //## 이미 스크롤되어서 보이지 않는 구간의 높이
        const clientHeight = document.documentElement.clientHeight; //## 사용자에게 보여지는 페이지의 높이

        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && !loading) {
            if (curPage === 1 || curPage < Math.ceil(pageTotal / limit)) {
                setCurPage(curPage + 1);
            }
        }
    };

    /**
     * 보호자님이 남긴 후기 Api 호출
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param page: 현재 페이지
     */
    const reviewListDetail = (page: number) => {
        let jobj: any = {
            limit: limit,
            page: page,

        };
        if (reviewId > 0 && curPage === 1) {
            jobj = {
                ...jobj,
                rating_id: reviewId
            };
        }

        reviewListApi(jobj);
    };

    /**
     * 보호자님이 남긴 후기 차단, 신고하기 메뉴 노출
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param id : 리뷰 ID
     */
    const showReviewMenuItem = (id: number) => {
        let flag: boolean = reviewItemMenu.active;
        if (reviewItemMenu.reviewId !== id) {
            flag = false;
        }
        setReviewItemMenu({
            reviewId: id,
            active: !flag
        });
    };

    /**
     * 차단하기, 차단 해제
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param type : block / cancel
     * @param ptrUsersId : 차단 리뷰 보호자 ID
     */
    const reviewBlock = (type: string, ptrUsersId: number) => {
        //### 리뷰 차단, 신고 메뉴 상태 초기화
        initReviewItemMenu();

        // if (Utils.isAuthCheck()) {
        //     LocalStorage.setStorage(LocalStorage.LOGIN_MOVE_URL, "/care/review/list");
        //     setLoginPopup({
        //         classActive: "active"
        //     });
        // } else {
            
        if (type === "block") { //### 차단하기 API 호출
            let jobj: any = {
                block_id: ptrUsersId
            };

            
            if (ENCRYPTION_TYPE === "TRUE") {
                let result = Utils.doubleEncryptionData(jobj);
                if (!Utils.isEmpty(result)) {
                    reviewBlockApi(result);
                } else {
                    // Utils.commonPopup(setPopup);
                    dispatch(showPopup(Popup, popupAction))
                }
            } else {
                reviewBlockApi(jobj);
            }
        } else { //### 차단해제 API 호출
            reviewBlockCancelApi(ptrUsersId);
        }
        // }
    };

    /**
     * 신고하기
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param id : 차단 리뷰 ID
     * @param ptrUsersId : 차단 대상 보호자 ID
     */
    const reviewReport = (id: number, ptrUsersId: number) => {
        if (userId === ptrUsersId) {
            Utils.commonPopup(setPopup, "본인이 작성한 후기는 신고할 수 없습니다.");

            //### 리뷰 차단, 신고 메뉴 상태 초기화
            initReviewItemMenu();
            return;
        }

        if (Utils.isAuthCheck()) {
            LocalStorage.setStorage(LocalStorage.LOGIN_MOVE_URL, "/care/review/list");
            setLoginPopup({
                classActive: "active"
            });
        } else {
            history.push({
                pathname: "/care/review/report",
                search: `?reviewId=${id}&userId=${ptrUsersId}`
            });
        }
    };

    /**
     * 리뷰 차단, 신고 메뉴 상태 초기화
     * -----------------------------------------------------------------------------------------------------------------
     */
    const initReviewItemMenu = () => {
        setReviewItemMenu({
            reviewId: 0,
            active: false
        });
    };

    const handleReviewBlock = (type: string, reviewId: any) => {
        // 로그인 안되어있을때
        if (Utils.isAuthCheck()) {
            LocalStorage.setStorage(LocalStorage.LOGIN_MOVE_URL, "/care/review/list");
            setLoginPopup({
                classActive: "active"
            });

            
        } else { // 로그인됫을때
            const popupContent = (<div className="popupWrap__tit">
                <h2>알림</h2>
                <p>사용자를 차단하시겠습니까?</p>
            </div>);

            dispatch(showPopup(Popup, (actionType) => {
                if (actionType === 'hide') {
                    dispatch(hidePopup());
                } else {
                    reviewBlockConfirmResult(type, reviewId);
                }
            }, undefined, "", undefined,  popupContent, 'two'));
        }
    }

    //##################################################################################################################
    //##
    //## >> Method : Render
    //##
    //##################################################################################################################

    /**
     * 보호자님이 남긴 후기 리스트 Rendering
     * -----------------------------------------------------------------------------------------------------------------
     */
    const renderReviewList = useMemo(() => {
        let html: any[] = [];
        if (Utils.isEmpty(reviewList) || reviewList.length === 0) {
            return html;
        }

        try {
            reviewList.map((item: any, idx: number) => {
                html.push(
                    <li className={(reviewId > 0 && idx === 0) ? "focus" : ""} key={idx}>
                        <div className="mainViwList__list--asol">
                             <strong>{item.rating.toFixed(1)}</strong>
                            <button type="button" onClick={()=> showReviewMenuItem(item.id)}>차단&신고하기</button>
                            {
                                (reviewItemMenu.active && reviewItemMenu.reviewId === item.id) &&
                                <div className='on'>
                                        {
                                            item.status === "block" ?
                                                <button type="button" className="blockBtn" onClick={() => reviewBlock("cancel", item.ptr_users_id)}>차단해제</button>
                                                :
                                                <button type="button" className="blockBtn"
                                                        onClick={() => 
                                                        // handleReviewBlock({classActive: "active", reviewId: item.ptr_users_id})
                                                        handleReviewBlock('block', item.ptr_users_id)
                                                        }>차단하기
                                                </button>
                                        }
                                        <button type="button" className="reportBtn" onClick={() => reviewReport(item.id, item.ptr_users_id)}>신고하기</button>
                                </div>
                            }
                        </div>
                        {
                            item.status === "block" ?
                                     <div className="mainViwList__list--txt">
                                        <span><strong>{item.prt_user.name}</strong>보호자</span>
                                            <i>{moment(item.created_at).format("YYYY.MM.DD")}</i>
                                            <p>
                                            차단 된 회원의 글입니다.
                                            <span>
                                                차단 된 회원의 모든 글은 <br />
                                                해제 전까지 보실 수 없습니다.
                                            </span>
                                        </p>
                                     </div>
                                :
                                 <div className="mainViwList__list--txt">
                                        {
                                            Utils.isEmpty(item.prt_user) ?
                                                <h3 className="txtStyle04-C333"><span className="txtStyle05-C777W500">탈퇴한 보호자</span></h3>
                                                :
                                                <span><strong>{item.prt_user.name}</strong>보호자</span>
                                        }

                                        <i>{moment(item.created_at).format("YYYY.MM.DD")}</i>
                                        <p>
                                            {item.content}
                                        </p>
                                        <small><span>{item.cgs_user.name }</span> 케어메이트에게</small>
                                </div>
                        }
                  </li>

                );
                return item;
            });
            return html;
        } catch (e) {
            return html;
        }
    }, [reviewList, reviewId, reviewItemMenu]);

    //##################################################################################################################
    //##
    //## >> Method : Popup
    //##
    //##################################################################################################################

    /**
     * 로그인 팝업 처리 결과
     * -----------------------------------------------------------------------------------------------------------------
     */
    const loginResult = () => {
        LocalStorage.remove(LocalStorage.LOGIN_MOVE_URL);
        setLoginPopup({
            classActive: ""
        });
    };

    /**
     * 보호자님이 남긴 후기 차단 확인 팝업 처리 결과
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param type : block / close
     */
    const reviewBlockConfirmResult = (type: string, reviewId: number) => {

        // setReviewBlockConfirmPopup({
        //     classActive: "",
        //     reviewId: 0
        // });
        dispatch(hideAction());

        if (type === "block") { //### 후기 차단 처리
            // console.log(type)
            if (userId === reviewId) {
                // Utils.commonPopup(setPopup, "본인이 작성한 후기는 차단할 수 없습니다.");
                dispatch(showPopup(Popup, undefined, undefined, "", undefined,  "본인이 작성한 후기는 차단할 수 없습니다."));

                //### 리뷰 차단, 신고 메뉴 상태 초기화
                initReviewItemMenu();
                return;
            }

            reviewBlock(type, reviewId);
        }
    };

    //##################################################################################################################
    //##
    //## >> Method : Api
    //##
    //##################################################################################################################

    /**
     * 유저 정보 Api
     * -----------------------------------------------------------------------------------------------------------------
     */
    const userInfoApi = () => {
        try {
            setLoading(true);
            Api.userInfo().then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.code === 200) {
                        setUserId(data.data.id);
                    } else {
                        Utils.commonPopup(setPopup, data.message);
                    }
                } else {
                    Utils.commonPopup(setPopup);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                Utils.commonPopup(setPopup);
            });
        } catch (e) {
            setLoading(false);
            Utils.commonPopup(setPopup);
        }
    };

    /**
     * 보호자님이 남긴 후기 리스트 Api
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param params : Object Data
     */
    const reviewListApi = (params: any) => {
        try {
            setLoading(true);
            Api.reviewList(params).then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    // 서버에서 받아온 데이터 할당
                    if (data.code === 200) {
                        let list: any[] = data.data.list;
                        // 데이터에 리스트 데이터 할당
                        if (!Utils.isEmpty(data.data.select) && curPage === 1) {
                            list.unshift(data.data.select);
                            // reviewId 가 있으면 해당 아이템을 서버에서 select 에 담아서 보내준다.
                            // 데이터에 select 가 있으면 0번째 인덱스로 담는다.
                            // main 에서 클릭한 요소에 id 를 reviewId 로 파라미터로 전달
                            // list 컴포넌트에서 파라미터를 받아서 해당 reviewId 가지고 0 번째 인덱스에 focus 클래스 추가
                        }
                        setReviewList(curPage === 1 ? list : reviewList.concat(list));
                        setPageTotal(data.data.total);
                    } else {
                        Utils.commonPopup(setPopup, data.message);
                    }
                } else {
                    Utils.commonPopup(setPopup);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                Utils.commonPopup(setPopup);
            });
        } catch (e) {
            setLoading(false);
            Utils.commonPopup(setPopup);
        }
    };

    /**
     * 보호자님이 남긴 후기 차단하기 Api
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param data : Object Data
     */
    const reviewBlockApi = (data: any) => {
        try {
            setLoading(true);
            Api.reviewBlock(data).then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.code === 200) {

                        if (curPage === 1) {
                            reviewListDetail(1);
                        } else {
                            window.scrollTo(0, 0);
                            setCurPage(1);
                        }

                        Utils.commonPopup(setPopup, "해당 회원의 글이 차단되었습니다.");
                    } else {
                        Utils.commonPopup(setPopup, data.message);
                    }
                } else {
                    Utils.commonPopup(setPopup);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                Utils.commonPopup(setPopup);
            });
        } catch (e) {
            setLoading(false);
            Utils.commonPopup(setPopup);
        }
    };

    /**
     * 보호자님이 남긴 후기 차단하기 Api
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param reviewId : 차단 리뷰 ID
     */
    const reviewBlockCancelApi = (reviewId: number) => {
        try {
            setLoading(true);
            Api.reviewBlockCancel(reviewId).then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.code === 200) {

                        if (curPage === 1) {
                            reviewListDetail(1);
                        } else {
                            window.scrollTo(0, 0);
                            setCurPage(1);
                        }

                        Utils.commonPopup(setPopup, "차단이 해제되었습니다.<br/>숨김처리 되었던 글을 확인하실 수 있습니다.");
                    } else {
                        Utils.commonPopup(setPopup, data.message);
                    }
                } else {
                    Utils.commonPopup(setPopup);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                Utils.commonPopup(setPopup);
            });
        } catch (e) {
            setLoading(false);
            Utils.commonPopup(setPopup);
        }
    };

    //##################################################################################################################
    //##
    //## >> Method : Interface
    //##
    //##################################################################################################################

    /**
     * 인터페이스 메소드 정의
     * -----------------------------------------------------------------------------------------------------------------
     */
    const interfaceMethod = {
        handleEncryption
    };

    /**
     * 데이터 암호화 Receiver Interface
     * -----------------------------------------------------------------------------------------------------------------
     *
     * @param data : Object Data
     */
    function handleEncryption(data: any) {
        try {
            if (data === 'fail') {
                return;
            }
            reviewListApi(data);
        } catch (e) {
            Utils.commonPopup(setPopup);
        }
    }

    //##################################################################################################################
    //##
    //## >> Method : Default Rendering
    //##
    //##################################################################################################################

    return (
        <>
            <Header
                historyBack={true}
                title="보호자님이 남긴 후기"
            />
            {
                loading && <Loading loading={loading}/>
            }
            <main>
               <div className="basicWrap">
                    <div className="basicWrap__flex">
                        <section className="mainViwList">
                            <article className="mainViwList__ban breakLine">
                                <h2>보호자가 말하는 찐 후기</h2>
                                <p>
                                    실제로 보호자님들이<br/>
                                    케어메이트에게 남겨 주셨어요
                                </p>
                            </article>
                            <article className="mainViwList__list">
                              <h2 className="a11y-hidden">후기 목록</h2>
                                <ul>
                                    {renderReviewList}
                                </ul>
                            </article>
                        </section>
                    </div>
               </div>
            </main>
            <LoginPopup
                classActive={loginPopup.classActive}
                loginResult={loginResult}
            />
            {/* <ReviewBlockConfirmPopup
                classActive={reviewBlockConfirmPopup.classActive}
                reviewBlockConfirmResult={reviewBlockConfirmResult}
            /> */}
            <Popup
                classActive={popup.classActive}
                type={popup.type}
                btnType={popup.btnType}
                content={popup.content}
                setPopup={setPopup}
            />
        </>
    );
};

export default List;