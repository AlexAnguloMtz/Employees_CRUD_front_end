import './styles.css';

export default function CustomSpinner(): JSX.Element {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    );
}