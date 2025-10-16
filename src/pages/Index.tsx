import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

type GameMode = 'menu' | 'settings' | 'categories' | 'playing';
type QuestionType = 'truth' | 'dare';

interface Category {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

interface Question {
  text: string;
  type: QuestionType;
  category: string;
  level: number;
}

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [spicyLevel, setSpicyLevel] = useState<number>(3);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Романтика', icon: 'Heart', enabled: true },
    { id: '2', name: 'Комедия', icon: 'Laugh', enabled: true },
    { id: '3', name: 'Интим', icon: 'Flame', enabled: true },
    { id: '4', name: 'Фантазии', icon: 'Sparkles', enabled: true },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const questions: Question[] = [
    { text: 'Расскажи о своей первой влюбленности', type: 'truth', category: 'Романтика', level: 1 },
    { text: 'Назови самую странную вещь, которая тебя привлекает', type: 'truth', category: 'Романтика', level: 2 },
    { text: 'Поцелуй партнера в шею', type: 'dare', category: 'Романтика', level: 2 },
    { text: 'Сделай комплимент партнеру на необычном языке', type: 'dare', category: 'Комедия', level: 1 },
    { text: 'Расскажи о своей самой смешной неловкой ситуации', type: 'truth', category: 'Комедия', level: 1 },
    { text: 'Опиши свою самую сокровенную фантазию', type: 'truth', category: 'Фантазии', level: 3 },
    { text: 'Покажи свой самый соблазнительный танец', type: 'dare', category: 'Интим', level: 3 },
    { text: 'Назови три вещи, которые тебя возбуждают', type: 'truth', category: 'Интим', level: 4 },
    { text: 'Сделай массаж партнеру 2 минуты', type: 'dare', category: 'Романтика', level: 2 },
    { text: 'Расскажи о своей самой безумной мечте', type: 'truth', category: 'Фантазии', level: 2 },
  ];

  const toggleCategory = (id: string) => {
    setCategories(cats => 
      cats.map(cat => cat.id === id ? { ...cat, enabled: !cat.enabled } : cat)
    );
  };

  const getRandomQuestion = (type: QuestionType) => {
    const enabledCategories = categories.filter(cat => cat.enabled).map(cat => cat.name);
    const filteredQuestions = questions.filter(
      q => q.type === type && 
      enabledCategories.includes(q.category) && 
      q.level <= spicyLevel
    );
    
    if (filteredQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  };

  const handleChoice = (type: QuestionType) => {
    const question = getRandomQuestion(type);
    setCurrentQuestion(question);
  };

  const getSpicyLevelText = () => {
    if (spicyLevel === 1) return 'Невинно';
    if (spicyLevel === 2) return 'Легко';
    if (spicyLevel === 3) return 'Умеренно';
    if (spicyLevel === 4) return 'Остро';
    return 'Очень остро';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-rose-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {gameMode === 'menu' && (
          <Card className="bg-white/90 backdrop-blur shadow-xl border-pink-200">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-pink-600 mb-2">Правда или Действие</h1>
                <p className="text-pink-500">Открой новые грани отношений</p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => setGameMode('settings')}
                  className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  <Icon name="Settings" className="mr-2" size={24} />
                  Настройки откровенности
                </Button>

                <Button 
                  onClick={() => setGameMode('categories')}
                  className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  <Icon name="Grid3x3" className="mr-2" size={24} />
                  Категории вопросов
                </Button>

                <Button 
                  onClick={() => setGameMode('playing')}
                  className="w-full h-16 text-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 font-bold"
                >
                  <Icon name="Play" className="mr-2" size={28} />
                  Начать игру
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {gameMode === 'settings' && (
          <Card className="bg-white/90 backdrop-blur shadow-xl border-pink-200">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setGameMode('menu')}
                  className="text-pink-600"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <h2 className="text-2xl font-bold text-pink-600">Уровень откровенности</h2>
                <div className="w-10" />
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Icon name="Flame" className="text-pink-500 mr-2" size={32} />
                  <span className="text-3xl font-bold text-pink-600">{getSpicyLevelText()}</span>
                </div>
                
                <Slider
                  value={[spicyLevel]}
                  onValueChange={(val) => setSpicyLevel(val[0])}
                  min={1}
                  max={5}
                  step={1}
                  className="mb-4"
                />

                <div className="flex justify-between text-sm text-pink-500">
                  <span>Невинно</span>
                  <span>Остро</span>
                </div>
              </div>

              <div className="bg-pink-50 rounded-lg p-4 mb-6">
                <p className="text-pink-700 text-center">
                  {spicyLevel === 1 && 'Легкие и невинные вопросы для начала'}
                  {spicyLevel === 2 && 'Немного более личные вопросы'}
                  {spicyLevel === 3 && 'Умеренно откровенные темы'}
                  {spicyLevel === 4 && 'Острые и провокационные вопросы'}
                  {spicyLevel === 5 && 'Максимально откровенные темы'}
                </p>
              </div>

              <Button 
                onClick={() => setGameMode('menu')}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                Сохранить
              </Button>
            </CardContent>
          </Card>
        )}

        {gameMode === 'categories' && (
          <Card className="bg-white/90 backdrop-blur shadow-xl border-pink-200">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setGameMode('menu')}
                  className="text-pink-600"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <h2 className="text-2xl font-bold text-pink-600">Категории</h2>
                <div className="w-10" />
              </div>

              <p className="text-pink-500 text-center mb-6">Выберите интересующие категории</p>

              <div className="space-y-3 mb-6">
                {categories.map(category => (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all ${
                      category.enabled 
                        ? 'bg-gradient-to-r from-pink-100 to-rose-100 border-pink-400' 
                        : 'bg-gray-100 border-gray-300 opacity-60'
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon name={category.icon} className={category.enabled ? 'text-pink-600' : 'text-gray-400'} size={28} />
                        <span className={`ml-3 text-lg font-semibold ${category.enabled ? 'text-pink-700' : 'text-gray-500'}`}>
                          {category.name}
                        </span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        category.enabled ? 'border-pink-600 bg-pink-600' : 'border-gray-400'
                      }`}>
                        {category.enabled && <Icon name="Check" className="text-white" size={16} />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={() => setGameMode('menu')}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                Сохранить
              </Button>
            </CardContent>
          </Card>
        )}

        {gameMode === 'playing' && !currentQuestion && (
          <Card className="bg-white/90 backdrop-blur shadow-xl border-pink-200">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setGameMode('menu')}
                  className="text-pink-600"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <h2 className="text-2xl font-bold text-pink-600">Выбери</h2>
                <div className="w-10" />
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => handleChoice('truth')}
                  className="w-full h-32 text-2xl bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <div className="flex flex-col items-center">
                    <Icon name="MessageCircle" size={48} className="mb-2" />
                    <span>Правда</span>
                  </div>
                </Button>

                <Button 
                  onClick={() => handleChoice('dare')}
                  className="w-full h-32 text-2xl bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <div className="flex flex-col items-center">
                    <Icon name="Zap" size={48} className="mb-2" />
                    <span>Действие</span>
                  </div>
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-2">
                <Badge variant="secondary" className="text-pink-600">
                  <Icon name="Flame" size={14} className="mr-1" />
                  {getSpicyLevelText()}
                </Badge>
                <Badge variant="secondary" className="text-pink-600">
                  {categories.filter(c => c.enabled).length} категорий
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {gameMode === 'playing' && currentQuestion && (
          <Card className={`shadow-xl border-4 ${
            currentQuestion.type === 'truth' 
              ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-400' 
              : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-400'
          }`}>
            <CardContent className="pt-8 pb-8 px-6">
              <div className="text-center mb-6">
                <Badge 
                  className={`mb-4 text-lg px-4 py-2 ${
                    currentQuestion.type === 'truth' 
                      ? 'bg-blue-500' 
                      : 'bg-orange-500'
                  }`}
                >
                  {currentQuestion.type === 'truth' ? (
                    <>
                      <Icon name="MessageCircle" size={20} className="mr-2" />
                      Правда
                    </>
                  ) : (
                    <>
                      <Icon name="Zap" size={20} className="mr-2" />
                      Действие
                    </>
                  )}
                </Badge>
                
                <div className="bg-white/80 rounded-lg p-6 mb-4">
                  <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
                    {currentQuestion.text}
                  </p>
                </div>

                <Badge variant="outline" className="text-pink-600 border-pink-300">
                  <Icon name="Tag" size={14} className="mr-1" />
                  {currentQuestion.category}
                </Badge>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setCurrentQuestion(null)}
                  className={`w-full h-14 text-lg ${
                    currentQuestion.type === 'truth'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                  }`}
                >
                  <Icon name="RotateCw" className="mr-2" size={20} />
                  Следующий вопрос
                </Button>

                <Button 
                  onClick={() => setGameMode('menu')}
                  variant="outline"
                  className="w-full h-12 border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  <Icon name="Home" className="mr-2" size={20} />
                  В главное меню
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
