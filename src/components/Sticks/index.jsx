import StickStyle from './SticksStyle.module.scss'
import boldStick from '../../assets/boldStick.svg'
import thinStick from '../../assets/thinStick.svg'

export const Sticks = () => {
    return (
        <div className={StickStyle['wrapper']}>
            <img src={boldStick} alt='stick' className={StickStyle['stick']} />
            <img src={boldStick} alt='stick' className={StickStyle['stick2']} />
            <img src={thinStick} alt='stick' className={StickStyle['stick3']} />
            <img src={thinStick} alt='stick' className={StickStyle['stick4']} />
            <img src={thinStick} alt='stick' className={StickStyle['stick5']} />
        </div>
    )
}