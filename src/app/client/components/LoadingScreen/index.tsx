import './styles.css';
import CustomSpinner from "../CustomSpinner";

export default function LoadingIndicator(): JSX.Element {
    return (
        <div className={'fullScreen'}>
            <CustomSpinner />
        </div>
    );
}