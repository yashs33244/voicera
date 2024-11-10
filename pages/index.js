import Layout from "@/components/layout/Layout"
import Banner1 from "@/components/sections/Banner1"
import Counter1 from "@/components/sections/Counter1"
import Pricing1 from "@/components/sections/Pricing1"
import Roadmap from "@/components/sections/Roadmap"
import Testimonial1 from "@/components/sections/Testimonial1"
import Tools from "@/components/sections/Tools"
import UseCases from "@/components/sections/UseCases"
import Video from "@/components/sections/Video"
import Writing from "@/components/sections/Writing"
export default function Home1() {

    return (
        <>
            <Layout mainCls="main-content fix" headerStyle={1} footerStyle={1}>
                <Banner1 />
                <Video />
                <Counter1 />
                <Writing />
                <UseCases />
                <Roadmap />
                <Pricing1 />
                <Tools />
                <Testimonial1 />


            </Layout>
        </>
    )
}