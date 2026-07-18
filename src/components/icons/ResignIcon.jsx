export default function KnightIcon(props) {
    return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M5 22V4" />
                <path d="M5 4h14l-3 5 3 5H5" />
            </svg>
    );
}