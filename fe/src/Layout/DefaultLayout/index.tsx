import Navbar from '~/Layout/DefaultLayout/Navbar';

interface Props {
    children: React.ReactNode;
}
const DefaultLayout = ({ children }: Props) => (
    <div>
        <Navbar />
        <div className="content">{children}</div>
    </div>
);
export default DefaultLayout;
