import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PageDetails from "./PageDetails";
import SeoSettings from "./SeoSettings";
import MicroBotSettings from "./MicroBotSettings";
import CustomCode from "./CustomCode";

const PageSettingsComponent = () => {
  const pageId = new URLSearchParams(window.location.search).get("pageId");
  return (
    <>
      <div className="settings">
        <div className="container mt-5">
          <div className="row">
            <Tabs defaultActiveKey="pageDetails" id="pageSettingTabsContainer">
              <Tab eventKey="pageDetails" title="Page Details">
                <div>
                  <PageDetails pageId={pageId} />
                </div>
              </Tab>
              <Tab eventKey="seo" title="SEO">
                <div>
                  <SeoSettings pageId={pageId} />
                </div>
              </Tab>
              <Tab eventKey="microbot" title="MicroBot Settings">
                <div>
                  <MicroBotSettings pageId={pageId} />
                </div>
              </Tab>
              <Tab eventKey="code" title="Code">
                <div>
                  <CustomCode pageId={pageId} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSettingsComponent;
