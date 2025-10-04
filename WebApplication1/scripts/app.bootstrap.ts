import './styles/tailwind.css';
import { XConBootstrap } from "@xcons/widget";
import App from "./app";
import { WidgetTextService } from "./widget_binding_text/models/widget-service-text";
import TestBindingText from "./widget_binding_text/widget";

XConBootstrap.run({
    rootWidget: App,
    widgets: [
        {
            widget: TestBindingText,
            initMode: 'manual'
        }
    ],
    services: [
        { service: WidgetTextService }
    ],
    providers: [
        {
            token: 'API_URL',
            useValue: 'https://api.example.com',
        },
        {
            token: 'CONFIG',
            useFactory: () => ({ debug: true, version: '1.0.0' })
        }
    ]
});