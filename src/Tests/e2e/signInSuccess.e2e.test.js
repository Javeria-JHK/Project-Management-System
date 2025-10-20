import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

// Helper function to create a small pause between actions
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function signInTest() {
  // Setup Chrome browser (non-headless so you can see it)
  const options = new chrome.Options();
   options.addArguments("--start-maximized");
  options.addArguments("--disable-password-manager-reauth");
  // following line is to not to watch the browser actions 
  // options.addArguments("--headless=new");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

    const expectedUrl = "http://localhost:5173/";

  try {
    console.log("\n🚀 Starting E2E Sign-In Test...\n");

    console.log("🧭 Opening Sign In page...");
    await driver.get("http://localhost:5173/signin");
    await delay(1000); // wait 1s so it’s visible

    console.log("🔍 Waiting for input fields...");
    const emailInput = await driver.wait(until.elementLocated(By.css("input[type='email']")), 5000);
    const passwordInput = await driver.findElement(By.css("input[type='password']"));
    const signInButton = await driver.findElement(By.xpath("//button[contains(.,'Sign In')]"));
    await delay(800);

    console.log("✍️ Typing credentials...");
    await emailInput.sendKeys("ali@example.com");
    await delay(500);
    await passwordInput.sendKeys("123456");
    await delay(1000);

    console.log("🖱️ Clicking Sign In button...");
    await signInButton.click();
    await delay(1000);

    console.log("⏳ Waiting for navigation...");
     
      await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      console.log("🌐 Current URL:", currentUrl);
   
      return currentUrl === expectedUrl;
    }, 15000);

    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl === expectedUrl) {
    console.log("✅ Login successful! Redirected exactly to Dashboard.\n");
    }
  else {
    console.log(`❌ Redirected to unexpected URL: ${currentUrl}\n`);
    }

  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    console.log("🧹 Closing browser...");
    await delay(1500);
    await driver.quit();
    console.log("🏁 Test finished.\n");
  }
}

signInTest();
