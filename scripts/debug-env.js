import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

console.log('🔍 Environment Variables Debug\n');

const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRE',
  'PORT',
  'NODE_ENV',
  'CLIENT_URL'
];

const optionalVars = [
  'VITE_API_URL'
];

console.log('Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '❌';
  const displayValue = varName.includes('SECRET') || varName.includes('URI') 
    ? (value ? '[SET]' : '[MISSING]')
    : (value || '[MISSING]');
  
  console.log(`${status} ${varName}: ${displayValue}`);
});

console.log('\nOptional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '⚠️';
  console.log(`${status} ${varName}: ${value || '[NOT SET]'}`);
});

console.log('\nAll Environment Variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('MONGO') || key.startsWith('JWT') || key.startsWith('VITE') || key.includes('PORT') || key.includes('NODE_ENV'))
  .forEach(key => {
    const value = key.includes('SECRET') || key.includes('URI') 
      ? '[HIDDEN]' 
      : process.env[key];
    console.log(`  ${key}: ${value}`);
  });