"use client";

import Back from "@modules/common/icons/back";
import FastDelivery from "@modules/common/icons/fast-delivery";
import Refresh from "@modules/common/icons/refresh";

import Accordion from "./accordion";
import { HttpTypes } from "@medusajs/types";

type ProductTabsProps = {
    product: HttpTypes.StoreProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
    const tabs = [
        {
            label: "Informații produs",
            component: <ProductInfoTab product={product} />,
        },
        {
            label: "Livrare și retururi",
            component: <ShippingInfoTab />,
        },
    ];

    return (
        <div className="w-full">
            <Accordion type="multiple">
                {tabs.map((tab, i) => (
                    <Accordion.Item
                        key={i}
                        title={tab.label}
                        headingSize="medium"
                        value={tab.label}
                    >
                        {tab.component}
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
    // Get characteristics from metadata
    const characteristics = product.metadata?.characteristics as
        | Record<string, string>
        | undefined;

    // If no characteristics in metadata, show default fields
    if (!characteristics || Object.keys(characteristics).length === 0) {
        return (
            <div className="text-small-regular py-8">
                <div className="grid grid-cols-2 gap-x-8">
                    <div className="flex flex-col gap-y-4">
                        <div>
                            <span className="font-semibold">Material</span>

                            <p>{product.material ? product.material : "-"}</p>
                        </div>
                        <div>
                            <span className="font-semibold">
                                Țara de origine
                            </span>
                            <p>
                                {product.origin_country
                                    ? product.origin_country
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <span className="font-semibold">Tip</span>
                            <p>{product.type ? product.type.value : "-"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <div>
                            <span className="font-semibold">Greutate</span>
                            <p>
                                {product.weight ? `${product.weight} g` : "-"}
                            </p>
                        </div>
                        <div>
                            <span className="font-semibold">Dimensiuni</span>
                            <p>
                                {product.length &&
                                product.width &&
                                product.height
                                    ? `${product.length}L x ${product.width}W x ${product.height}H`
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Split characteristics into two columns
    const characteristicsArray = Object.entries(characteristics);
    const midpoint = Math.ceil(characteristicsArray.length / 2);
    const leftColumn = characteristicsArray.slice(0, midpoint);
    const rightColumn = characteristicsArray.slice(midpoint);

    return (
        <div className="text-small-regular py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col gap-y-4">
                    {leftColumn.map(([key, value]) => (
                        <div key={key}>
                            <span className="font-semibold">{key}</span>
                            <p>{value || "-"}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-4">
                    {rightColumn.map(([key, value]) => (
                        <div key={key}>
                            <span className="font-semibold">{key}</span>
                            <p>{value || "-"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ShippingInfoTab = () => {
    return (
        <div className="text-small-regular py-8">
            <div className="grid grid-cols-1 gap-y-8">
                <div className="flex items-start gap-x-2">
                    <FastDelivery />
                    <div>
                        <span className="font-semibold">Livrare rapidă</span>
                        <p className="max-w-sm">
                            Coletul tău va ajunge în 3-5 zile lucrătoare la
                            punctul de ridicare sau la tine acasă.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-x-2">
                    <Refresh />
                    <div>
                        <span className="font-semibold">Schimburi simple</span>
                        <p className="max-w-sm">
                            Nu se potrivește perfect? Nicio grijă - îți vom
                            schimba produsul cu unul nou.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-x-2">
                    <Back />
                    <div>
                        <span className="font-semibold">Retururi ușoare</span>
                        <p className="max-w-sm">
                            Returnează produsul și îți vom rambursa banii.
                            Fără întrebări – vom face tot posibilul ca returul
                            tău să fie cât mai simplu.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTabs;
