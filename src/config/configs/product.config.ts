import { BaseEnvironmentConfig } from '../../utils/base/base.config.utils';
import { registerAs } from '@nestjs/config';
import { ConfigName } from '../config.constants';

export class ProductVariables {
  constructor(
    readonly DEFAULT_INVESTOR_LOGO = 'https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/thumbnail/SunProperty/_default_upload_bucket/2438/image-thumb__2438__1000/SG_1665540218.png',
  ) {}
}

class ProductConfig extends BaseEnvironmentConfig<ProductVariables> {
  constructor() {
    super(ProductVariables);
  }
}

export default registerAs<ProductVariables>(ConfigName.PRODUCT, () =>
  new ProductConfig().getConfiguration(),
);
