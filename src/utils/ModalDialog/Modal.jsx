import {Button, Modal} from "react-bootstrap";

export default function Modals ({show, handleTwoBtn, twoBtn, twoBtnText, handleOneBtn, oneBtnText}){

    return(
            <Modal show={show} onHide={handleTwoBtn} className="animate_modal">
                <div className={''} >
                    <div className={''}>
                        Hello
                    </div>
                    <div className={'mb-2'} style={{display: 'flex', width: '95%', marginLeft: 'auto', marginRight: 'auto'}}>
                        {twoBtn &&
                            <Button onClick={handleTwoBtn} className={'btn'}
                                    style={{width: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
                                {twoBtnText !== undefined ? twoBtnText : 'cancel'}
                            </Button>
                        }
                        <Button onClick={handleOneBtn} className="btn"
                                style={{width: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
                            {oneBtnText !== undefined ? oneBtnText : 'ok'}
                        </Button>
                    </div>
                </div>
            </Modal>

    )
}