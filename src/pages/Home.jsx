import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Grid from '../components/Grid';
import Section, {SectionBody, SectionTitle} from '../components/Section';
import ProductsComponent from '../components/ProductsComponent';
import Loading from '../components/Loading';
import Helmet from '../components/Helmet';

import bannerImg from '../asset/images/home_banner.webp';
import productApi from '../api/productApi.js';

const Home = () => {
    const [newProduct, setNewProduct] = useState([]);
    const [popularProduct, setPopularProduct] = useState([]);
    const [teeProduct, setTeeProduct] = useState([]);
    const [hoodieProduct, setHoodieProduct] = useState([]);
    const [sweaterProduct, setSweaterProduct] = useState([]);

    // get new products
    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await productApi.getNewProducts({limit: 12});
                setNewProduct(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get new product!', error);
            }
        };
        fetchNewProducts();
    }, []);

    // get popular products
    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await productApi.getPoularProducts({limit: 12});
                setPopularProduct(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get popular product!', error);
            }
        };
        fetchPopularProducts();
    }, []);

    // get tee category products
    useEffect(() => {
        const fetchTeeProducts = async () => {
            try {
                const response = await productApi.getProductsByCategory({
                    category_slug: 'tee',
                    limit: 12,
                });
                setTeeProduct(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get tee product!', error);
            }
        };
        fetchTeeProducts();
    }, []);

    // get hoodie category products
    useEffect(() => {
        const fetchHoodieProducts = async () => {
            try {
                const response = await productApi.getProductsByCategory({
                    category_slug: 'hoodie',
                    limit: 12,
                });
                setHoodieProduct(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get hoodie product!', error);
            }
        };
        fetchHoodieProducts();
    }, []);

    // get sweater category products
    useEffect(() => {
        const fetchSweaterProducts = async () => {
            try {
                const response = await productApi.getProductsByCategory({
                    category_slug: 'sweater',
                    limit: 12,
                });
                setSweaterProduct(response.data);
            } catch (error) {
                console.log('Feiled to fetch api get sweater product!', error);
            }
        };
        fetchSweaterProducts();
    }, []);

    return (
        <Helmet title='Trang ch???'>
            <main className='home'>
                <div className='container'>
                    <section className='home_banner'>
                        <Link to=''>
                            <img src={bannerImg} alt='home banner' />
                        </Link>
                    </section>
                    <section className='home_endow'>
                        <h3 className='home_endow_title'>??u ????i cho ri??ng b???n</h3>
                        <Grid col={4} mdCol={3} smCol={2} xsCol={1} gap={16}>
                            <HomeEndowItem
                                title='GI???M 5K CHO ????N T??? 200K'
                                desc='M?? gi???m gi??: 8YO200K / S??? d???ng m?? ??? trang thanh to??n'
                                code='8YO200K'
                            />
                            <HomeEndowItem
                                title='GI???M 10K CHO ????N T??? 350K'
                                desc='M?? gi???m gi??: 8YO350K / S??? d???ng m?? ??? trang thanh to??n'
                                code='8YO350K'
                            />
                            <HomeEndowItem
                                title='GI???M 15K CHO ????N T??? 500K'
                                desc='M?? gi???m gi??: 8YO500K / S??? d???ng m?? ??? trang thanh to??n'
                                code='8YO500K'
                            />
                            <HomeEndowItem title='T???t c??? s???n ph???m ?????u SALE upto 50%' />
                        </Grid>
                    </section>
                    <Section>
                        <SectionTitle>
                            <h2>S???N PH???M M???I TINH</h2>
                        </SectionTitle>
                        {newProduct != null && newProduct.length > 0 ? (
                            <SectionBody>
                                <ProductsComponent data={newProduct} />
                            </SectionBody>
                        ) : (
                            <Loading />
                        )}
                    </Section>
                    <Section>
                        <SectionTitle>
                            <h2>S???N PH???M N???I B???T</h2>
                        </SectionTitle>
                        {popularProduct != null && popularProduct.length > 0 ? (
                            <SectionBody>
                                <ProductsComponent data={popularProduct} />
                            </SectionBody>
                        ) : (
                            <Loading />
                        )}
                    </Section>
                    <Section>
                        <SectionTitle>
                            <h2>TEE 8YO</h2>
                        </SectionTitle>
                        {teeProduct != null && teeProduct.length > 0 ? (
                            <SectionBody>
                                <ProductsComponent
                                    data={teeProduct}
                                    buttonText='tee 8yo'
                                    buttonLink='collections/tee'
                                />
                            </SectionBody>
                        ) : (
                            <Loading />
                        )}
                    </Section>
                    <Section>
                        <SectionTitle>
                            <h2>HOODIE 8YO</h2>
                        </SectionTitle>
                        {hoodieProduct && hoodieProduct.length > 0 ? (
                            <SectionBody>
                                <ProductsComponent
                                    data={hoodieProduct}
                                    buttonText='hoodie 8yo'
                                    buttonLink='collections/hoodie'
                                />
                            </SectionBody>
                        ) : (
                            <Loading />
                        )}
                    </Section>
                    <Section>
                        <SectionTitle>
                            <h2>SWEATER 8YO</h2>
                        </SectionTitle>
                        {sweaterProduct && sweaterProduct.length > 0 ? (
                            <SectionBody>
                                <ProductsComponent
                                    data={sweaterProduct}
                                    buttonText='sweater 8yo'
                                    buttonLink='collections/sweater'
                                />
                            </SectionBody>
                        ) : (
                            <Loading />
                        )}
                    </Section>
                </div>
            </main>
        </Helmet>
    );
};

const HomeEndowItem = (props) => {
    // handle copy discount code
    const copyCode = (button) => {
        let text = button.target.getAttribute('data-code');
        navigator.clipboard.writeText(text);
        button.target.innerText = '???? sao ch??p';
        button.target.classList.add('disabled');
    };

    return (
        <div className='home_endow_item'>
            <h5 className='home_endow_item_title'>{props.title}</h5>
            {props.desc ? <p className='home_endow_item_desc'>{props.desc}</p> : null}
            {props.code ? (
                <div className='home_endow_item_copy'>
                    <button
                        onClick={copyCode.bind(this)}
                        className='home_endow_item_copy_btn'
                        data-code={props.code}
                    >
                        Sao ch??p m??
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Home;
