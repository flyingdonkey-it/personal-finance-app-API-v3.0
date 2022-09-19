const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

export default async function institutionsDetail(req, res) {
  const { institutionId } = req.query;
  try {
    const { data } = await axios.get('https://au-api.basiq.io/institutions', {
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const selectedData = data.data.filter(item => item.id === institutionId);

    res.status(200).json(selectedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
