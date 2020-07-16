import { TestModuleMetadata, MetadataOverride, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { Type, Provider, ClassProvider } from '@angular/core';
import { NgModule } from '@angular/compiler/src/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export class TestUtil {
    private static originalTimeoutInterval: number;

    public static beforeEachCompiler(
        component: any,
        config: TestModuleMetadata,
        override?: IOverride
    ): Promise<{
        fixture: ComponentFixture<any>,
        instance: any,
        injector: TestBed
    }> {
        let injector = getTestBed();

        return TestUtil.configureTestingModule(config, override).compileComponents().then(() => {
                let fixture: ComponentFixture<any> = null;

                if (component) {
                    fixture = TestBed.createComponent(component);
                }
                this.originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                jasmine.DEFAULT_TIMEOUT_INTERVAL = Math.pow(2, 31) - 1;

                return{
                    fixture,
                    instance: fixture && fixture.debugElement ? fixture.debugElement.componentInstance : null,
                    injector
                };
        }).catch(error => {
            console.warn(error);
            return {
                fixture: null,
                instance: null,
                injector
            }
        });
    }

    public static configureTestingModule(config: TestModuleMetadata, override: IOverride): typeof TestBed {
        let moduleDef: TestModuleMetadata = {
            declarations: [],
            providers: [],
            imports: []
        };

        if (config) {

            if (Array.isArray(config.imports)) {
                moduleDef.imports = moduleDef.imports.concat(config.imports);
                const httpClientModuleIndex = moduleDef.imports.findIndex(x => x === HttpClientModule);
                if (httpClientModuleIndex !== -1) {
                    moduleDef.imports[httpClientModuleIndex] = HttpClientTestingModule;
                }
            }

            if (Array.isArray(config.declarations)) {
                moduleDef.declarations = moduleDef.declarations.concat(config.declarations);
            }

            if (Array.isArray(config.providers)) {
                config.providers.forEach(cProvider => {
                    if (cProvider instanceof Object) {
                        let index = moduleDef.providers.findIndex((mProvider: any) => mProvider && mProvider.provide ?
                            mProvider.provide = cProvider.provide :
                            ((<Function>mProvider).name === (<Function>cProvider).name)
                        );
                        if (index === -1) {
                            moduleDef.providers.push(cProvider);
                        } else {
                            moduleDef.providers[index] = cProvider;
                        }
                    }
                })
            }

        }

        if (override) {
            if (override.modules) {
                TestBed.overrideModule(override.modules.ngModule, override.modules.metaData);
            }
            if (override.component) {
                TestBed.overrideComponent(override.component.component, override.component.metaData);
            }
        }

        return TestBed.configureTestingModule(moduleDef);
    }

    public static afterEachCompiler(fixture: ComponentFixture<any>, done: DoneFn): any {
        if (fixture) {
            fixture.destroy();
        }
        jasmine.DEFAULT_TIMEOUT_INTERVAL = this.originalTimeoutInterval;
        done();
    }

    public static mergeProviders(target: Provider[], source: Provider[]): Provider[] {

        source.forEach(cProvider => {
            if (cProvider instanceof Object) {
                let index = target.findIndex((mProvider: any) => mProvider && mProvider.provide ?
                    mProvider.provide === (<ClassProvider>cProvider).provide :
                    (<Function>mProvider).name === (<Function>cProvider).name
                )
                if (index === -1) {
                    target.push(cProvider);
                } else {
                    target[index] = cProvider;
                }
            }
        });

        return target;
    }

    public static querySelectorByFormControlName(fixture: ComponentFixture<any>, name: string) {
        return fixture.debugElement.nativeElement.querySelector(`[formcontrolname="${name}"]`);
    }
}

export class IOverride {
    modules?: { ngModule: Type<any>, metaData: MetadataOverride<NgModule> }
    component?: { component: any, metaData: MetadataOverride<any> }
}
