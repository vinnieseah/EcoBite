import { HttpException } from '@/exceptions/HttpException';
import { openAIHelper } from '@/server';
import { isBase64Image } from '@/utils/data';
import { Service } from 'typedi';

@Service()
export class OpenaiService {
  public async validateImage(image: string): Promise<unknown> {
    if (!isBase64Image(image)) throw new HttpException(400, 'Invalid image format');

    const prompt = `
                    Analyze the image provided. The image MUST satisfy all of the following criteria:
                        1. It must have food as the main subject.
                        2. It must not be a screenshot.
                        3. It must include visible and identifiable food items.
                        4. It must appear freshly prepared or recently served.
                    Please respond always and uniquely with the following JSON object as you are a REST API that returns the following object:
                    {
                    "validityFactor": {validityFactorNumber}, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
                    "descriptionOfAnalysis": "{analysis}", // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make them understand why the image doesn't satisfy the criteria if it doesn't, without going into detail on exact criteria. Remember we are rewarding users for capturing food images that promote sustainable dining.
                    }
                    `;

    const gptResponse = await openAIHelper.askChatGPTAboutImage({
      base64Image: image,
      prompt,
    });

    const responseJSONStr = openAIHelper.getResponseJSONString(gptResponse);

    return openAIHelper.parseChatGPTJSONString(responseJSONStr);
  }
}

