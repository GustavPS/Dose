import { Header, Redirect, Rewrite } from '../../lib/load-custom-routes';
export declare type DomainLocales = Array<{
    http?: true;
    domain: string;
    locales?: string[];
    defaultLocale: string;
}>;
export declare type NextConfig = {
    [key: string]: any;
} & {
    i18n?: {
        locales: string[];
        defaultLocale: string;
        domains?: DomainLocales;
        localeDetection?: false;
    } | null;
    headers?: () => Promise<Header[]>;
    rewrites?: () => Promise<Rewrite[]>;
    redirects?: () => Promise<Redirect[]>;
    trailingSlash?: boolean;
    future: {
        strictPostcssConfiguration: boolean;
        excludeDefaultMomentLocales: boolean;
        webpack5: boolean;
    };
};
export declare const defaultConfig: NextConfig;
export declare function normalizeConfig(phase: string, config: any): any;
