
// api
export function reviewList(data: any) {
    // let auth = LocalStorage.getStorage(LocalStorage.TOKEN_TYPE) + ` ` + LocalStorage.getStorage(LocalStorage.ACCESS_TOKEN);
    return new Promise((resolve, reject) => {
            return baseApi(apiCarePrefix).post(Constants.REVIEW_LIST_API, data, getAccessTokenHeader())
                .then((response) => {
                    successStatusCheck(response, resolve)
                }).catch(err => {
                    failStatusCheck(err, reject)
                });
        }
    )
}


function getAccessTokenHeader() {
    let auth = LocalStorage.getStorage(LocalStorage.AUTHORIZATION);
    return {headers: {'Authorization': auth ? auth : ""}}
}


// localstorage
export const AUTHORIZATION = "authorization";


export const SHOW_POPUP = "popup/SHOW" as const;
export const HIDE_POPUP = "popup/HIDE" as const;

/*
    element: Function | any; //## Popup Element
    action: Function | any; //## Button Action
    actionType: string; //## Button Action Type
    type: string; //## Popup Type(popup / bottomPopup)
    title: string; //## 제목
    content: string; //## 내용
    btnType: string; //## one / two
    btn01: string; //## 첫번째 버튼 텍스트
    btn02: string; //## 두번째 버튼 텍스트
 */
export const showPopup = (
 1    element: React.ReactNode,
 2    action?: (type: string,
      result?: any) => void, 
 3    actionType?: string | any, 
 4    type?: string, 
 5    title?: string | number, 
 6    content?: string, 
 7    btnType?: string, 
 8    btn01?: string, 
 9    btn02?: string) => ({
    type: SHOW_POPUP,
    payload: {element, action, actionType, type, title, content, btnType, btn01, btn02}
});

export const hidePopup = () => ({ type: HIDE_POPUP });

export type PopupAction = | ReturnType<typeof showPopup> | ReturnType<typeof hidePopup>;



const Popup = () => {

    const popup = useSelector((state: any) => state.popup);

    const DEFAULT_MSG = "일시적인 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.";

    useEffect(() => {
        document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;

        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    //##################################################################################################################
    //##
    //## >> Method : Default Rendering
    //##
    //##################################################################################################################

    return (
        <div className="popupWrap">
            <div className="popupWrap__tit">
                <h2>{Utils.isEmpty(popup.title) ? "알림" : popup.title}</h2>
                <h2 dangerouslySetInnerHTML={{__html: Utils.isEmpty(popup.title) ? "알림" : popup.title}}/>
                <p dangerouslySetInnerHTML={{__html: Utils.isEmpty(popup.content) ? DEFAULT_MSG : popup.content}}/>
            </div>
            <div className="buttonWrap">
                {
                    popup.btnType === 'two' &&
                    <button type="button" className="outlineTxtBtn"
                            onClick={() => popup.action("hide")}>
                        {Utils.isEmpty(popup.btn01) ? "취소" : popup.btn01}
                    </button>
                }
                <button type="button" className="solidBtn"
                        onClick={() => popup.action(popup.actionType)}>
                    {Utils.isEmpty(popup.btn02) ? "확인" : popup.btn02}
                </button>
            </div>
        </div>
    );
};

export default Popup;








/**
 * RSA Public key 가져오기
 * -----------------------------------------------------------------------------------------------------------------
 */
 export function getRSAPublicKey() {
    return new Promise((resolve, reject) => {
            return baseApi().get(Constants.GET_RSA_PUBLIC_KEY_API, getAccessTokenHeader())
                .then((response) => {
                    successStatusCheck(response, resolve)
                }).catch(err => {
                    failStatusCheck(err, reject)
                });
        }
    )
}



GET_RSA_PUBLIC_KEY_API = RSA Public Key 요청
AUTHORIZATION = "authorization";


function getAccessTokenHeader() {
    let auth = LocalStorage.getStorage(LocalStorage.AUTHORIZATION);
    if (auth) {
        return {
            headers: {
                'Authorization': auth
            }
        }
    } else {
        return
    }
}







































// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const login = () => {
    let msg;

    if (Utils.isEmpty(email)) {
        msg = "이메일을 입력해주세요.";
    } else if (!Utils.emailCheck(email)) {
        msg = "이메일 형식이 맞지않습니다.";
    } else if (Utils.isEmpty(password)) {
        msg = "비밀번호를 입력해주세요.";
    } else if (!Utils.existingPasswordCheck(password)) {
        msg = "비밀번호 형식이 맞지않습니다.";
    }
    if (Utils.isEmpty(msg)) {
        let jobj = {
            email: email,
            password: password
        };
        if (ENCRYPTION_TYPE === 'TRUE') {
            let data = JSON.stringify(jobj);

            let aesData: string = Utils.encryptAES256(data, email);
            loginApi(aesData);
        } else {
            loginApi(jobj);
        }
    } else {
        dispatch(showPopup(Popup, popupAction, "", "popup", "", msg));
    }
};


ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

const loginApi = (apiData: any) => {
    try {
        Api.login(apiData, btoa(email)).then((response: any) => {
            if (response.status === 200) {
                let data = response.data;
                if (data.code === 200) {
                    Utils.getRSAPublicKeyApi(data.data.token_type + " " + data.data.access_token, data.data.user.id, function (flag: boolean) {
                        //todo flag가 false일경우 재귀함수처럼 재호출해야됨
                        let json = {
                            authorization: data.data.token_type + " " + data.data.access_token,
                            id: data.data.user.id,
                            phone: data.data.user.phone,
                            name: data.data.user.name
                        };

                        Utils.pageFinish("login", JSON.stringify(json));
                    });
                } else {
                    dispatch(showPopup(Popup, popupAction, "", "popup", "", data.message));
                }
            } else {
                dispatch(showPopup(Popup, popupAction));
            }
        }).catch(err => {
            console.log(err);
            dispatch(showPopup(Popup, popupAction));
        });
    } catch (e) {
        dispatch(showPopup(Popup, popupAction));
    }
};


Api_data = {email: 'okh8822@hmcnetworks.co.kr', password: 'hmc15n3084!'}
email =  okh8822@hmcnetworks.co.kr

ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

export function login(data: any, userId: string) {
    return new Promise((resolve, reject) => {
            return baseApi(apiCarePrefix).post(Constants.LOGIN_API + '/' + userId, data)
                .then((response) => {
                    successStatusCheck(response, resolve)
                }).catch(err => {
                    failStatusCheck(err, reject)
                });
        }
    )
}

useriD =  b2toODgyMkBobWNuZXR3b3Jrcy5jby5rcg==





ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


const reviewData = () => {
    let jobj: any = {
        limit: limit,
        page: reviewListData.page
    };
    if (reviewId > 0 && jobj.page === 1) {
        jobj = {
            ...jobj,
            rating_id: reviewId
        };
    }
    if (ENCRYPTION_TYPE === "TRUE") {
        let result = Utils.doubleEncryption(jobj);
        if (!Utils.isEmpty(result)) {
            reviewListApi(result);
        } else {
            dispatch(showPopup(Popup, popupAction));
        }
    } else {
        reviewListApi(jobj);
    }
};


 마운트시 reviewData() 호출 
 jobj 객체 생성 (limit:limit , page: reviewListData.page)
 ENCRYPTION_TYPE 이 true 이면 result에 doubleEncryption(jobj) 결과값은 할당
 doubleEncryption 호출 되면 변수 rsaPublicKey 에 로컬스토리지에서 가져온 RES_PUBLIC_KEY 의 value 를 담는다
 isAuthCheck() 실행해서 localstorage에 authorization 값이 있으면 true , rsaPublickey 값이 있으면 ture
 두 조건이 만족되면 rsaData 변수에 encryptRSA(data) 의 결과를 할당 (여기서 data 는 jobj)
 encryptRSA()호출되면 rsaPublicKey 에 localstorage 에서 가져온 RES_PUBLIC_KEY 의 value 를 담는다.
 객체 변수 생성 - obj (빈객체)
 인자로 넘겨준 jobj 를 for in 문으로 순환하면서 값을 value에 할당 하는데 타입검사로 숫자면 스트링으로 변환
 만약 jobj 객체 안에 auth 가 포함되 있으면 substr(7,8) 에 "_" 추가 아니면 authSubStr()호출 (7,8 번째 스트링 사용 함수)
 그리고 crypto.publicEncrypt 로 암호화된 값을 value에 할당 (값을들 각각 다르게 암호화 되서 담긴다)
 빈 객체 였던 obj 객체에 기존에 obj 의 객체의 키값이 있으면 담아주고 , 키 와 암호화된 값을 담아준다.
 암호화된 obj 객체 반환
 rsaData == obj 객체 (암호화된)
 aesData 에 할당되는 encryptAES256(JSON.stringify(rsaData)) 호출 암호화된 객체가 할당된 rsaData를 json으로 변환해 인자로 넘긴다.
 encryptAES256이 실행되면 localstorage에서 USER_ID 의 값을 가져와 user_id 에 할당한다.
 만약 userId 가 없으면 두번째 인자로 들어온 값으로 userId를 할당하고 없으면 함수를 빠져 나간다.
 첫번째 인자로 넘어온 암호와된 obj 객체로 암호화된 값을 반환한다. (AES 암호화 과정)
 doubleEncryption 는 최종적으로 AES로 암호화된 aesData 를 반환한다.
 list 컴포넌트에 reviewData() 함수로 돌아와서 반환받은 값을 result에 할당한단.
 값이 있으므로 첫번째 if 문에 reviewListApi에 인자로 넣어주고 호출한다.
 reviewListApi 가 실행되면 Api.reviewList 함수에 파라미터로 reviewListApi에 넣어준 인자를 넘기고 호출한다.
 reviewList 가 실행되고 서버에서 유효한 값을 확인하고 데이터를 응답받으면 data 의 list 를 list 배열 변수에 할당한다.
 만약 data 에 select 가 존재하고 페이지가 1 이면 list 변수에 첫번째 인덱스로 unshift 한다.
 아니면 setReviewListData 에 기존 reviewListData 를 넣어주고 list의 page 가 1 이면 list 를 아니면 기존 데이터의 뒤에 새로운 데이터를 concat으로 붙여준다.
 isNext 에 total 나누기 limit 값에서 소수점 올린 값이 page 보다 크면 해당 값을 isNext 에 값으로 준다.




export function encryptRSA(data: any, auth?: string) {
    let rsaPublicKey = LocalStorage.getStorage(LocalStorage.RSA_PUBLIC_KEY);
    
    if (!rsaPublicKey) {
        return;
    }
    let obj: any = {};
    for (let item in data) {
        let value = data[item];
        value = typeof value === "number" ? value.toString() : value;
        if (item.includes(auth ? (auth.substr(7, 8) + "_") : authSubStr())) {
            value = crypto.publicEncrypt({key: rsaPublicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(value, 'utf8') ).toString('base64');
            console.log(value)
        }
        obj = {
            ...obj,
            [item]: value
        };
    }
    return obj;
    }

export function doubleEncryption(data: any) {
    let rsaPublicKey = LocalStorage.getStorage(LocalStorage.RSA_PUBLIC_KEY);
    if (!isAuthCheck() && !isEmpty(rsaPublicKey)) {
        let rsaData: any = encryptRSA(data);
        let aesData: string = encryptAES256(JSON.stringify(rsaData));
        return aesData;
    } else {
        return null;
    }
}

export function isAuthCheck() {
    return isEmpty(LocalStorage.getStorage(LocalStorage.AUTHORIZATION))
}

export function isEmpty(value: any) {
    return typeof value === "undefined" || value === null || value === "";
}
    
    