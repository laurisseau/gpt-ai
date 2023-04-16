import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

export const createChat = async (req, res) => {
  try {
    const openAi = new OpenAIApi(
      new Configuration({
        organization: 'org-riNVup9DpM4qAoGeG6mfjS89',
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    const completion = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Genetic Engineering

      Genetic engineering involves the direct manipulation of genes for practical purposes. The recombinant DNA technology used to make insulin is a key tool in genetic engineering. This process involves cutting DNA with a restriction enzyme and then splicing the DNA from two different sources together. These sources may be from different individuals within a species, from different species, or from totally unrelated organisms. The resulting recombinant DNA is then inserted into a host cell, which multiplies to form a colony of genetically identical cells, each carrying the recombinant DNA. The genes within these cells can be turned on or off, or even eliminated altogether. This allows for the creation of organisms with new traits or the alteration of existing traits.
      
      The possibilities of genetic engineering are limitless. For example, scientists are working on developing crops that are resistant to pests and diseases, that require fewer herbicides and pesticides, and that are more nutritious. Genetic engineering can also be used to produce pharmaceuticals such as vaccines, growth hormones, and blood-clotting factors. In addition, it can be used to clone organisms, including humans.
      
      Despite the potential benefits of genetic engineering, there are also concerns about its safety and ethical implications. Critics argue that genetic engineering may result in unintended consequences, such as the creation of new diseases or the spread of genetic mutations. There are also concerns about the use of genetic engineering for human cloning and the potential for eugenics. As with any new technology, it is important to weigh the potential benefits against the risks and to ensure that ethical considerations are taken into account.
      
      using the text above ${req.body.question} and can you explain it like a biology college professor`,
        },
      ],
    });

    const message = completion.data.choices[0].message;

    res.status(200).json({ message: message });
  } catch (error) {
    console.log(error);
  }
};
