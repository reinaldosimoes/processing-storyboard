import Layout from "./components/Layout/Layout";
import Processing from "./components/Processing/Processing";
import { MOCK_STEPS } from "./constants/demo";

function App() {
  return (
    <Layout>
      <Processing steps={MOCK_STEPS} />
    </Layout>
  );
}

export default App;
